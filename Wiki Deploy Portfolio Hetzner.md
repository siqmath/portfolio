# Wiki: Deploy Portfolio Hetzner

Esta wiki documenta o processo de acesso e deploy manual do portfólio no servidor VPS Hetzner por fora do ambiente do Antigravity.

---

## 1. Como Acessar a VPS por fora do Antigravity

Você pode acessar o servidor diretamente de qualquer terminal (PowerShell, Command Prompt, Git Bash ou terminal do Linux/macOS) usando a sua chave SSH dedicada.

### Passo a Passo

1. **Abra o seu terminal local** (ex: PowerShell ou terminal de sua preferência).
2. **Execute o comando SSH** apontando para a sua chave privada local:

```bash
ssh -i C:\Users\Matheus\.ssh\id_antigravity root@88.198.163.108
```

> **Nota sobre permissões de chave no Windows:** 
> Se o Windows reclamar de permissões muito abertas na chave privada (erro `Unprotected Private Key File`), você pode ajustar as permissões do arquivo `id_antigravity` para que apenas o seu usuário tenha acesso de leitura, ou utilizar o terminal do WSL/Git Bash.

3. Uma vez dentro da VPS, você estará conectado como usuário `root` no terminal Linux.

---

## 2. Processo de Deploy Manual na VPS

Caso queira fazer o deploy ou atualizar o portfólio manualmente na VPS por fora da IDE:

1. **Acesse a VPS via SSH** (conforme o passo anterior).
2. **Navegue até o diretório do projeto**:
   ```bash
   cd /home/matheus/portfolio
   ```
3. **Puxe as alterações mais recentes do GitHub**:
   ```bash
   git pull origin main
   ```
4. **Reconstrua e reinicie os containers Docker**:
   ```bash
   docker-compose down && docker-compose up -d --build
   ```
5. **Verifique se o site subiu corretamente**:
   ```bash
   curl -I http://localhost
   ```
   *(A resposta esperada é um código de redirecionamento `307` ou `200 OK`).*

---

## 3. Segurança da Chave SSH

### A chave `id_antigravity` se tornou pública?
**Não.** A chave privada `id_antigravity` reside estritamente no seu diretório local (`C:\Users\Matheus\.ssh\id_antigravity`). 
* Durante os commits e pushes de Git realizados nesta sessão, **apenas arquivos de código e tradução foram enviados para o GitHub**.
* O arquivo da chave privada nunca foi adicionado à árvore do Git e não foi exposto publicamente.

### Pontos de Atenção e Vulnerabilidade Gerados:
Embora a chave não tenha sido exposta publicamente, a arquitetura atual apresenta os seguintes pontos de atenção quanto à segurança:

1. **Acesso Direto como `root`**:
   A chave SSH conecta-se diretamente com o usuário privilegiado `root`. Se a chave local for comprometida por qualquer malware ou invasão no seu computador de desenvolvimento, o invasor obterá controle administrativo total e irrestrito sobre toda a sua VPS.
   * *Mitigação recomendada:* Configurar um usuário padrão sem privilégios administrativos (ex: `matheus`) na VPS para realizar deploys, e desabilitar o login direto de `root` via SSH nas configurações do `/etc/ssh/sshd_config`.

2. **Ausência de Passphrase na Chave**:
   Se a chave `id_antigravity` local não possuir uma senha de criptografia (passphrase), qualquer pessoa que obtenha acesso físico ou lógico aos seus arquivos locais conseguirá utilizá-la instantaneamente.
   * *Mitigação recomendada:* Proteger chaves SSH locais críticas com uma passphrase forte.

3. **Ignorar Validação de Host (`StrictHostKeyChecking=no`)**:
   Utilizar a flag `-o StrictHostKeyChecking=no` em scripts ou execuções locais automatizadas evita a confirmação manual da impressão digital do servidor. Em conexões realizadas através de redes públicas ou não confiáveis, isso abre brecha para ataques de Man-in-the-Middle (MitM).
