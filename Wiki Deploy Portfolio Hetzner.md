# Wiki: Deploy Portfolio Hetzner

Esta wiki documenta o processo de acesso e deploy manual do portfólio no servidor VPS Hetzner por fora do ambiente do Antigravity, agora sob uma arquitetura de segurança reforçada e não-root.

---

## 1. Como Acessar a VPS por fora do Antigravity (Acesso Seguro Não-Root)

Para mitigar a vulnerabilidade de acesso direto como `root`, o servidor foi reconfigurado para permitir o acesso completo de deploy e controle de containers usando o usuário restrito **`matheus`**.

### Passo a Passo

1. **Abra o seu terminal local** (ex: PowerShell ou terminal de sua preferência).
2. **Execute o comando SSH** apontando para a sua chave privada local, conectando como usuário `matheus`:

```bash
ssh -i C:\Users\Matheus\.ssh\id_antigravity matheus@88.198.163.108
```

> **Nota sobre permissões de chave no Windows:** 
> Se o Windows reclamar de permissões muito abertas na chave privada (erro `Unprotected Private Key File`), você pode ajustar as permissões do arquivo `id_antigravity` para que apenas o seu usuário tenha acesso de leitura, ou utilizar o terminal do WSL/Git Bash.

3. Uma vez conectado, você estará operando com privilégios limitados e isolados dentro da pasta pessoal `/home/matheus`, garantindo a integridade do sistema operacional da VPS.

---

## 2. Processo de Deploy Manual na VPS

Caso queira fazer o deploy ou atualizar o portfólio manualmente na VPS por fora da IDE:

1. **Acesse a VPS via SSH** como usuário `matheus` (conforme o passo anterior).
2. **Navegue até o diretório do projeto**:
   ```bash
   cd /home/matheus/portfolio
   ```
3. **Puxe as alterações mais recentes do GitHub** (a pasta foi reconfigurada com propriedade do grupo `matheus`):
   ```bash
   git pull origin main
   ```
4. **Reconstrua e reinicie os containers Docker** (o usuário `matheus` possui permissão no grupo `docker` para rodar sem `sudo`):
   ```bash
   docker-compose down && docker-compose up -d --build
   ```
5. **Verifique se o site subiu corretamente**:
   ```bash
   curl -I http://localhost
   ```
   *(A resposta esperada é um código de redirecionamento `307` ou `200 OK`).*

---

## 3. Segurança da Chave SSH e Mitigações Concluídas

### A chave `id_antigravity` se tornou pública?
**Não.** A chave privada `id_antigravity` reside estritamente no seu diretório local (`C:\Users\Matheus\.ssh\id_antigravity`). 
* Durante os commits e pushes de Git realizados nesta sessão, **apenas arquivos de código e tradução foram enviados para o GitHub**.
* O arquivo da chave privada nunca foi adicionado à árvore do Git e não foi exposto publicamente.

### Resolução de Fraquezas Concluída:

1. **Acesso Direto como `root` (RESOLVIDO)**:
   * *O problema:* A chave anteriormente conectava como `root`, permitindo que qualquer comprometimento da chave expusesse todo o sistema operacional da VPS.
   * *A solução:* Autorizamos a chave `id_antigravity` diretamente no usuário não-privilegiado `matheus` (`/home/matheus/.ssh/authorized_keys`), alteramos a propriedade da pasta `/home/matheus/portfolio` de `root` para `matheus`, e vinculamos o usuário ao grupo `docker` para que o build e o deploy rodem de forma 100% isolada e segura, sem necessidade de root.

2. **Ausência de Passphrase na Chave**:
   * *Recomendação contínua:* Para aumentar ainda mais a segurança, você pode aplicar uma passphrase à sua chave SSH local digitando `ssh-keygen -p -f C:\Users\Matheus\.ssh\id_antigravity` no seu terminal Windows.

3. **Ignorar Validação de Host (`StrictHostKeyChecking=no`)**:
   * *Recomendação contínua:* Evite usar `-o StrictHostKeyChecking=no` fora de ambientes de automação locais conhecidos. Ao conectar manualmente, permita que o SSH adicione e verifique a impressão digital (fingerprint) do host no seu arquivo `known_hosts`.
