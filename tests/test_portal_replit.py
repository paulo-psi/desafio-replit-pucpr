import threading
import functools
import http.server
import socketserver
from pathlib import Path
import pytest
from playwright.sync_api import sync_playwright

ROOT_DIR = Path(__file__).resolve().parent.parent

REQUIRED_VIDEO_IDS = {
    "rDR1ym2HQKc",
    "cLzQGaGuxOA",
    "JleGqrG6Lhc",
    "c70oPEfvARY",
    "yZylpOR5n7o",
    "Lz5H6WuV6iU",
    "NjGfb7XjsIQ",
    "Jc7vOaadsLY",
    "C1VjuaWEPI4",
    "NXbya3qmMi8",
    "gPUGz8YSQwc",
    "TbtBUYxpygA",
    "QBJVxwscuvI",
}


@pytest.fixture(scope="module")
def local_server_url():
    handler = functools.partial(
        http.server.SimpleHTTPRequestHandler, directory=str(ROOT_DIR)
    )
    httpd = socketserver.TCPServer(("127.0.0.1", 0), handler)
    port = httpd.server_address[1]
    thread = threading.Thread(target=httpd.serve_forever, daemon=True)
    thread.start()
    yield f"http://127.0.0.1:{port}/index.html"
    httpd.shutdown()
    httpd.server_close()


def test_portal_kit_inscrito_end_to_end(local_server_url):
    console_errors = []
    page_errors = []

    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1440, "height": 900})
        page = context.new_page()
        page.on(
            "console",
            lambda msg: console_errors.append(msg.text)
            if msg.type == "error"
            else None,
        )
        page.on("pageerror", lambda err: page_errors.append(str(err)))

        page.goto(local_server_url, wait_until="networkidle")

        # 1. Institucional, Links Obrigatórios e Restrições Globais
        html_lower = page.content().lower()
        assert "hotmilk" not in html_lower, "Proibido mencionar Hotmilk"
        assert "forms.office.com" not in html_lower, "Site não é página de inscrição"

        emp_links = page.locator('a[href="https://empreendedorismo.pucpr.br/"]').count()
        assert emp_links >= 2, "Deve conter links para https://empreendedorismo.pucpr.br/"

        edital_url = "https://empreendedorismo.pucpr.br/wp-content/uploads/2026/11/Edital_Desafio-Replit-PUCPR-2026.pdf"
        edital_links = page.locator(f'a[href="{edital_url}"]').count()
        assert edital_links >= 2, "Deve conter botão/link para o Edital PDF oficial"

        body_text = page.locator("body").inner_text()
        for required_term in [
            "Empreendedorismo PUCPR",
            "Administração",
            "Replit",
            "17, 18 e 19",
            "14h às 17h",
            "Bloco 10",
            "Politécnica",
            "Watts Humphrey",
        ]:
            assert required_term in body_text, f"Termo obrigatório ausente: {required_term}"

        # 2. Imagens Oficiais (2 Logos PUCPR + Cartaz Oficial)
        for img_src in [
            "./assets/img/logo-pucpr-selo.png",
            "./assets/img/logo-pucpr-marista.jpg",
            "./assets/img/cartaz-desafio-replit.jpg",
        ]:
            width = page.evaluate(
                """(src) => {
                    const img = document.querySelector(`img[src="${src}"]`);
                    return img ? img.naturalWidth : 0;
                }""",
                img_src,
            )
            assert width > 0, f"Imagem oficial não carregou: {img_src}"

        # 3. Fluxograma Didático Interativo (diagram-design)
        flow_nodes = page.locator("[data-flow-step]").count()
        assert flow_nodes == 8, f"Esperados 8 nós no fluxograma, encontrados {flow_nodes}"
        initial_title = page.locator("#flow-detail-title").inner_text()
        page.locator("#flow-next").click()
        next_title = page.locator("#flow-detail-title").inner_text()
        assert next_title != initial_title, "Botão Próxima Etapa deve atualizar o painel do fluxograma"

        # Clicar diretamente no nó 4 (Decisão / Preview)
        page.locator('[data-flow-step="4"]').click()
        step4_title = page.locator("#flow-detail-title").inner_text()
        assert "Preview" in step4_title or "Funcionou" in step4_title

        # 4. Raio-X Interativo da Tela do Replit (6 Hotspots)
        spots = page.locator("[data-xray-spot]").count()
        assert spots == 6, f"Esperados 6 pinos no Raio-X, encontrados {spots}"
        page.locator('[data-xray-spot="4"]').click()
        xray_title = page.locator("#xray-detail-title").inner_text()
        assert "Visual Editor" in xray_title

        # 5. Exemplos Práticos de Administração/Negócios -> Montador de Prompts
        presets = page.locator("[data-preset]").count()
        assert presets >= 4, "Esperados pelo menos 4 exemplos de negócios/gestão"
        page.locator('[data-preset="gestao"]').first.click()
        prompt_text = page.locator("#prompt-gerado-output").inner_text()
        assert "GestãoFácil" in prompt_text
        assert "5 exemplos" in prompt_text or "5 registros" in prompt_text

        # Testar botão de cóia acessível (copy-button)
        copy_btn = page.locator("#btn-copy-builder")
        copy_btn.click()
        is_disabled = copy_btn.is_disabled()
        assert not is_disabled, "Botão de cópia nunca deve receber disabled"
        status_text = page.locator("#tip-copy-builder").inner_text().strip()
        assert "Copiado" in status_text

        # 6. Abas das 4 Etapas de Prompts (tabs)
        tab_stage3 = page.locator('#prompt-stage-tabs [role="tab"]').nth(2)
        tab_stage3.click()
        assert tab_stage3.get_attribute("aria-selected") == "true"

        # 7. Videoteca Auditada (13 Vídeos + Filtros + Player <dialog closedby="any">)
        rendered_ids = set(
            page.evaluate(
                """() => Array.from(document.querySelectorAll('#grid-videos [data-video-id]'))
                              .map(el => el.getAttribute('data-video-id'))"""
            )
        )
        assert rendered_ids == REQUIRED_VIDEO_IDS, f"IDs divergentes: {rendered_ids ^ REQUIRED_VIDEO_IDS}"

        page.locator('[data-video-filter="rapido"]').click()
        assert page.locator("#grid-videos [data-video-id]").count() == 2
        page.locator('[data-video-filter="pratico"]').click()
        assert page.locator("#grid-videos [data-video-id]").count() == 8
        page.locator('[data-video-filter="imersao"]').click()
        assert page.locator("#grid-videos [data-video-id]").count() == 3
        page.locator('[data-video-filter="todos"]').click()
        assert page.locator("#grid-videos [data-video-id]").count() == 13

        # Abrir Player Embutido <dialog>
        page.locator('#grid-videos [data-video-id="rDR1ym2HQKc"] button, #grid-videos [data-video-id="rDR1ym2HQKc"]').first.click()
        modal = page.locator("#video-modal")
        assert modal.evaluate("el => el.open") is True
        iframe_src = page.locator("#video-modal-iframe").get_attribute("src")
        assert "rDR1ym2HQKc" in iframe_src
        page.locator("#video-modal-close").click()
        assert modal.evaluate("el => el.open") is False

        # 8. Checklist Gamificado de 6 Missões (localStorage)
        checks = page.locator(".chk-missao")
        assert checks.count() == 6
        for i in range(6):
            checks.nth(i).check()
        assert page.locator("#xp-percent").inner_text().strip() == "100%"

        # 9. Auditoria Matemática de Contraste WCAG AA e Responsividade (3 Viewports)
        for vp in [
            {"width": 1440, "height": 900},
            {"width": 768, "height": 1024},
            {"width": 390, "height": 844},
        ]:
            page.set_viewport_size(vp)
            overflow = page.evaluate(
                "() => document.documentElement.scrollWidth > document.documentElement.clientWidth"
            )
            assert not overflow, f"Overflow horizontal detectado em {vp}"

        assert len(console_errors) == 0, f"Erros de console: {console_errors}"
        assert len(page_errors) == 0, f"Erros de página: {page_errors}"
        browser.close()
