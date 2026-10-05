# Ronald Pinheiro — Advogados Associados

Landing page estática em HTML, CSS e JavaScript, baseada no frame `1:20`:
https://www.figma.com/design/nBAI98VlpTqMj4XwUcOMMz/LP?node-id=1-20

## Prévia local

```sh
python3 -m http.server 4174 --bind 127.0.0.1 --directory dist
```

Abra http://127.0.0.1:4174. Não há dependências de execução nem etapa de build.

## Implementação

- `dist/index.html`: todas as seções do Figma, textos e imagens originais.
- `dist/styles.css`: tokens de cor e tipografia, composição desktop e adaptações responsivas.
- `dist/script.js`: menu móvel, navegação, galeria ampliada com teclado e estados dos destinos pendentes.
- `dist/config.js`: destinos externos configuráveis; todos vazios por solicitação do usuário.
- `dist/assets/`: 20 imagens originais baixadas do Figma e fontes locais.

As cores seguem o Figma: marrom `#745a3b`, dourado `#e9ca88`, dourado escuro `#b1914d`, claro `#efeeef` e preto `#12120b`. A largura máxima do conteúdo é 1280 px. Imagens, recortes, espelhamento dos retratos, textos e ordem das seções foram preservados. A duplicação do selo Galeria também está no frame original; a segunda ocorrência foi ocultada apenas dos leitores de tela.

## Tipografia pendente

O design usa **Novantique Serif Light/Regular** e **Lato**. Lato está incluída. Como a fonte Novantique não foi fornecida, os títulos usam **Cormorant Garamond Light/Regular** como alternativa temporária, mantendo a preferência pela Novantique quando instalada localmente.

Para igualar a tipografia, adicione o CSS do projeto web do Adobe Fonts ao `<head>` e ajuste `--font-display` ao nome CSS informado pelo projeto Adobe. Alternativamente, adicione os arquivos web licenciados por meio de `@font-face`. Não incluímos arquivos de fonte comerciais obtidos de terceiros.

Licenças Lato e Cormorant Garamond: `dist/assets/fonts/*-OFL.txt`.

## Configurar os links quando disponíveis

Em `dist/config.js`, preencha:

```js
window.SITE_CONFIG = Object.freeze({
  whatsapp: '',        // Número com código do país e DDD.
  youtubeChannel: '',  // URL HTTPS do canal.
  youtubeVideo: '',    // URL HTTPS do vídeo.
  newsArchive: '',     // URL HTTPS do arquivo de notícias.
  articles: [],        // Três URLs HTTPS, na ordem das reportagens.
});
```

Enquanto vazios, os agendamentos levam à seção Contato. Vídeo, canal e reportagens exibem um aviso discreto de indisponibilidade. Nenhum contato ou destino foi inventado. A galeria abre as nove fotos, com navegação pelas setas e fechamento por Escape.

O rodapé mantém o ano 2022 presente no Figma.
