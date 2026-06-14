# sona — landing page

Landing de conversão do Sona (app iOS, App Store `id6774424990`). Site estático, sem build, pronto pra deploy.

## estrutura

```
landing/
├── index.html        ← página única (hero → tour → árvore → mascotes → cartas → pilares → prova → privacidade → planos → faq → cta → footer)
├── styles.css        ← design system + componentes + responsivo
├── main.js           ← reveals no scroll, nav, estrelas, parallax do hero, barra fixa mobile
├── assets/
│   ├── screens/      ← screenshots REAIS do app (jpg otimizado)
│   ├── mascots/      ← lumi · tico · bertha (png transparente)
│   ├── trees/        ← 6 estágios da árvore (semente → frutos)
│   └── icon.png      ← ícone do app
├── robots.txt · sitemap.xml · 404.html
└── (legal mora separado: repo sona-legal → josediogor.github.io/sona-legal)
```

## marca

- **fontes:** Fraunces (títulos display), Nunito (corpo/UI), Caveat (acentos à mão) — via Google Fonts.
- **paleta:** cream `#FFF8F0` · lilás `#C4A8E8` · verde `#B8D4A0` · pêssego `#F5C5A3` · laranja CTA `#FF8C42` · marrom texto `#3D3530`.
- **voz:** minúsculas, suave, íntima, PT-BR. laranja é exclusivo de CTAs de instalar.

## deploy

Qualquer host estático serve a pasta inteira:

- **GitHub Pages:** suba o conteúdo de `landing/` na branch/pasta publicada. (sem subpasta de projeto = links relativos funcionam direto.)
- **Vercel / Netlify:** arraste a pasta `landing/` ou aponte o output dir pra ela. Sem build step.
- **teste local:** `python3 -m http.server` dentro de `landing/` e abra `http://localhost:8000`.

## notas

- 100% responsivo, mobile-first (público abre no celular). Barra fixa de CTA aparece no mobile após o hero.
- Respeita `prefers-reduced-motion` (animações desligam, com fallbacks estáticos).
- `?shot=1` na URL revela tudo de uma vez (modo QA pra screenshots de página inteira).
- Trocar o link da App Store: buscar `id6774424990` no `index.html`.
- Quando houver avaliações reais, trocar a seção "quem já chegou" / nota "a sona é novinha" por reviews verdadeiros.
