const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// ⚙️ CONFIGURAÇÕES (Ajuste os caminhos conforme sua estrutura)
const dirTrabalho = path.resolve(__dirname, './kubejs'); 
const dirDespejo = path.resolve(__dirname, '../kubejs');   
const branchGit = 'master'; // Alterado para master conforme o seu log

/**
 * Sincroniza arquivos baseado na data de modificação (mtime)
 */
function sincronizarArquivos(src, dest) {
    // Cria o diretório de destino se não existir
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const arquivos = fs.readdirSync(src);

    for (const arquivo of arquivos) {
        // Ignora a pasta do Git e a pasta node_modules (se houver)
        if (arquivo === '.git' || arquivo === 'node_modules') continue;

        const caminhoSrc = path.join(src, arquivo);
        const caminhoDest = path.join(dest, arquivo);

        const statusSrc = fs.statSync(caminhoSrc);

        if (statusSrc.isDirectory()) {
            // Chamada recursiva para subpastas (assets, etc)
            sincronizarArquivos(caminhoSrc, caminhoDest);
        } else {
            let deveCopiar = true;

            // Se o arquivo já existe no despejo, checa a data
            if (fs.existsSync(caminhoDest)) {
                const statusDest = fs.statSync(caminhoDest);
                
                // Só copia se o arquivo de trabalho for ESTRITAMENTE mais novo
                if (statusSrc.mtime <= statusDest.mtime) {
                    deveCopiar = false;
                }
            }

            if (deveCopiar) {
                console.log(`✅ Atualizando: ${arquivo}`);
                fs.copyFileSync(caminhoSrc, caminhoDest);
            }
        }
    }
}

/**
 * Automatiza o Git (Add, Commit, Push)
 */
function automatizarGit() {
    try {
        console.log('\n--- Iniciando Rotina do Git ---');
        process.chdir(__dirname); // Muda o contexto para o diretório de trabalho

        // Verifica se há arquivos modificados
        const status = execSync('git status --porcelain').toString();
        if (!status) {
            console.log('Nenhuma mudança nova para enviar ao GitHub.');
            return;
        }

        console.log('Mudanças detectadas. Preparando commit...');
        execSync('git add .');
        execSync(`git commit -m "Auto-update: Atualização de rotina (${new Date().toISOString()})"`);
        execSync(`git push origin ${branchGit}`);
        
        console.log('🚀 Mudanças enviadas para o GitHub com sucesso!');
    } catch (error) {
        console.error('❌ Erro na automação do Git!');
        if (error.stdout) console.error('Saída do comando:\n', error.stdout.toString());
        if (error.stderr) console.error('Motivo exato do erro:\n', error.stderr.toString());
    }
}

// ==========================================
// Execução do Script
// ==========================================
console.log('--- Iniciando Sincronização de Arquivos ---');
sincronizarArquivos(dirTrabalho, dirDespejo);
console.log('Sincronização local concluída.');

automatizarGit();