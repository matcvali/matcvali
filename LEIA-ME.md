# Meu site

Site pessoal em três idiomas com biblioteca, caminho de disciplinas, interesses, documentos e currículo.
Feito com [Astro](https://astro.build), publicado de graça no GitHub Pages e editado pelo [Pages CMS](https://pagescms.org).

---

## Parte 1. Publicar o site (uma vez só, uns 15 minutos)

### 1. Criar o repositório
1. Entre em https://github.com/new
2. Em **Repository name**, escreva exatamente `SEU-USUARIO.github.io` (troque pelo seu usuário do GitHub).
   Assim o endereço do site fica `https://SEU-USUARIO.github.io`. Qualquer outro nome também funciona, mas o endereço fica `https://SEU-USUARIO.github.io/nome-do-repo`.
3. Deixe **Public**. Não marque nenhuma outra opção. Clique em **Create repository**.

### 2. Enviar os arquivos
O jeito mais simples sem usar terminal é o **GitHub Desktop**:
1. Baixe em https://desktop.github.com e entre com sua conta.
2. **File > Clone repository**, escolha o repositório que você criou e uma pasta no seu computador.
3. Copie **todo o conteúdo** desta pasta (incluindo `.github` e `.pages.yml`, que ficam ocultos no Finder/Explorer) para dentro da pasta clonada.
   - Mac: no Finder, `Cmd + Shift + .` mostra os arquivos ocultos.
   - Windows: no Explorer, **Exibir > Itens ocultos**.
4. Volte ao GitHub Desktop, escreva "primeira versão" no campo **Summary**, clique em **Commit to main** e depois em **Push origin**.

### 3. Ligar o GitHub Pages
1. No repositório, vá em **Settings > Pages**.
2. Em **Source**, escolha **GitHub Actions**.
3. Vá na aba **Actions**. Vai ter uma execução chamada "Publicar site". Quando ficar verde (1 a 2 minutos), o site está no ar.

Se ficou vermelho, clique na execução, copie o erro e me mande.

### 4. Proteger a conta
Ative a verificação em duas etapas: **foto do perfil > Settings > Password and authentication > Enable two-factor authentication**. Isso é o que realmente protege o site.

---

## Parte 2. Editar o conteúdo (sempre que quiser)

1. Entre em https://app.pagescms.org e clique em **Sign in with GitHub**.
2. Autorize o acesso ao repositório do site.
3. Escolha o repositório. Aparecem as seções do menu lateral:
   - **Perfil e currículo**: nome, bio, foto, formação, publicações.
   - **Biblioteca**: um item por livro.
   - **Caminho**: uma disciplina por item. O campo **Etapa** decide em qual parada do mapa ela aparece.
   - **Interesses**: um texto por interesse.
   - **Documentos**: envie o PDF e preencha título, tipo e data.
4. Clique em **Save**. Em 1 a 2 minutos o site atualiza sozinho.

Na primeira vez, apague os exemplos (livros, disciplinas, PDFs) e troque pelos seus.

### Traduções
Todo campo com "(inglês)" ou "(espanhol)" é opcional. Se ficar vazio, o site mostra o texto em português naquela versão, com um aviso discreto. Menus e botões já estão traduzidos.

### Avançar no mapa
Quando terminar uma disciplina, abra ela em **Caminho** e mude o status de **Cursando** para **Concluída**. A trilha fica laranja sozinha e a barra de progresso atualiza.

---

## Onde fica cada coisa (para quem quiser mexer no código)

| O quê | Arquivo |
|---|---|
| Cores, fontes, cantos arredondados | `src/styles/global.css` (topo do arquivo) |
| Textos fixos dos menus nos 3 idiomas | `src/i18n/ui.ts` |
| Perfil e currículo | `src/data/perfil.yml` |
| Livros, disciplinas, interesses, documentos | `src/content/...` (um `.md` por item) |
| PDFs e imagens | `public/documentos/` e `public/imagens/` |
| Páginas | `src/pages/[lang]/` |
| Configuração do painel | `.pages.yml` |
| Publicação automática | `.github/workflows/publicar.yml` |

### Rodar no próprio computador (opcional)
Precisa do [Node.js](https://nodejs.org) 22 ou mais novo.
```
npm install
npm run dev
```
Abra http://localhost:4321.

---

## Segurança, em resumo
- O site é estático: não tem banco de dados nem login para visitantes. Não há o que invadir no site em si.
- O ponto fraco é sua conta do GitHub. Use verificação em duas etapas.
- Tudo no repositório é público. Não coloque CPF, telefone, endereço ou rascunhos privados.
- Limite de 100 MB por arquivo e cerca de 1 GB no total. Notas e relatórios cabem com folga.

## Domínio próprio (opcional, pago)
Se um dia quiser `seunome.com.br` (cerca de R$40/ano no registro.br): **Settings > Pages > Custom domain**. Me chame que eu te guio.
