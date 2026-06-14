# sona — landing page

Landing de conversão do Sona (app iOS, App Store `id6774424990`). Site estático, sem build, pronto pra deploy.

## estrutura

```
landing/
├── index.html        ← página única (hero → tour → árvore → mascotes → cartas → pilares → prova → privacidade → planos → faq → cta → footer)
├── styles.css        ← design system + componentes + responsivo
├── main.js           ← reveals no scroll, nav, estrelas, parallax do hero, barra fixa mobile
├── i18n.js           ← i18n pt/en/es: 140 chaves × 3 línguas, toggle no header, autodetecção
├── assets/
│   ├── screens/      ← screenshots REAIS do app (jpg otimizado)
│   ├── mascots/      ← lumi · tico · bertha (png transparente)
│   ├── trees/        ← 6 estágios da árvore (semente → frutos)
│   └── icon.png      ← ícone do app
├── robots.txt · sitemap.xml · 404.html · CNAME (custom domain)
└── (legal mora separado: repo sona-legal → josediogor.github.io/sona-legal)
```

## marca

- **fontes:** Fraunces (títulos display), Nunito (corpo/UI), Caveat (acentos à mão) — via Google Fonts.
- **paleta:** cream `#FFF8F0` · lilás `#C4A8E8` · verde `#B8D4A0` · pêssego `#F5C5A3` · laranja CTA `#FF8C42` · marrom texto `#3D3530`.
- **voz:** minúsculas, suave, íntima, PT-BR. laranja é exclusivo de CTAs de instalar.

## deploy

- **Produção (LIVE):** **https://sonadreams.com** — repo `josediogor/sona-site`, branch `main` raiz, custom domain via arquivo `CNAME`. Apex canônico, www→apex, HTTPS forçado. DNS na GoDaddy: 4 A records do apex → `185.199.108-111.153`, CNAME `www` → `josediogor.github.io`.
- **outro host estático:** Vercel/Netlify servem a pasta inteira sem build step (links relativos funcionam direto).
- **teste local:** `python3 -m http.server` dentro de `landing/` e abra `http://localhost:8000` (i18n e `?shot=1` precisam do JS rodando).

## notas

- 100% responsivo, mobile-first (público abre no celular). Barra fixa de CTA aparece no mobile após o hero.
- Respeita `prefers-reduced-motion` (animações desligam, com fallbacks estáticos).
- `?shot=1` na URL revela tudo de uma vez (modo QA pra screenshots de página inteira).
- Trocar o link da App Store: buscar `id6774424990` no `index.html`.
- Quando houver avaliações reais, trocar a seção "quem já chegou" / nota "a sona é novinha" por reviews verdadeiros.
- **i18n:** copy mora no `i18n.js` (`data-i18n="chave"` no HTML). Idioma por `?lang=pt|en|es` > localStorage `sona_lang` > navegador, default PT. Pra adicionar string: criar a chave nos **3** dicionários e pôr `data-i18n` no elemento.
- **analytics:** GA4 `G-6F5FHSGNDQ` no `index.html`, eventos `app_store_click` (cta_location) e `scroll_depth` (25/50/75/90%). + JSON-LD (SoftwareApplication + FAQPage) e smart app banner.

## todo / pendências i18n

A landing traduz a copy, mas dois pontos ainda são PT-only e ficam pra depois:

- [ ] **Screenshots do app localizados** — os JPGs em `assets/screens/` mostram a UI do app em português pra todos os idiomas (imagens estáticas, não trocam com o toggle). Gerar versões EN/ES e servir por idioma (ex: `assets/screens/en/`, `assets/screens/es/` + troca no `i18n.js`).
- [ ] **Moeda por locale** — preços hardcoded em R$ (`pro.price`, `pro.alt`, `free.name`/`free.li*` com R$0) nas 3 línguas. Quando o pricing US sair ($6,99/39,99/99,99), mostrar moeda conforme o idioma.
