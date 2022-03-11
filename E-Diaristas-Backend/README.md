<h1 align="center">
    <img alt="E-Diaristas" title="E-Diaristas" src="../.github/logo.svg" width="220px" />
</h1>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-projeto">Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rodando">Rodando</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-como-contribuir">Como contribuir</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
</p>

<a id="-projeto">
<p align="center">
 <img src="https://img.shields.io/static/v1?label=PRs&message=welcome&color=7159c1&labelColor=000000" alt="PRs welcome!" />

  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=7159c1&labelColor=000000">
</p>

<br>

<p align="center">
  <img alt="E-Diaristas-Frontend" src="../.github/app.png" width="100%">
</p>

<a id="rocket-tecnologias"></a>

## 🚀 Tecnologias

O Backend da aplicação foi desenvolvido com as seguintes tecnologias:

![](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white) ![](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white) ![](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)

<a id="rodando"></a>

## 💻 Rodando

### 📁 Rodando através da fonte:

Tenha certeza de ter o Python instalado com PIP.

Abra o terminal no projeto e então execute os códigos abaixo.

Para instalar as dependências:

```bash
pip install -r requirements.txt
```

Antes de iniciar a aplicação tenha certeza que você realizou as migrações pro banco de dados SQLITE.

```bash
python manage.py makemigrations && python manage.py migrate
```

Para rodar a aplicação:

```bash
python manage.py runserver
```

## 🤔 Como contribuir

<a id="-como-contribuir"></a>

- Faça um fork desse repositório;
- Cria uma branch com a sua feature: `git checkout -b minha-feature`;
- Faça commit das suas alterações: `git commit -m 'feat: Minha nova feature'`;
- Faça push para a sua branch: `git push origin minha-feature`.

Depois que o merge da sua pull request for feito, você pode deletar a sua branch.
