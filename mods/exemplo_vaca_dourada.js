// Mod de exemplo: A Vaca Dourada
Eldoria.registrar({
  id: 'vaca_dourada', nome: 'A Vaca Dourada', versao: '1.0', autor: 'Crônicas de Eldoria',
  descricao: 'Adiciona o Leite Dourado, a Vaca Brava e um presente a cada novo dia.',
  iniciar(api) {
    api.item('leite_dourado', { name: 'Leite Dourado', type: 'potion', use: { heal: 80 }, value: 60, stack: true,
      icon: { k: 'potion', c: '#ffd040' }, desc: 'Leite de uma vaca mágica. Cura 80 de vida.' });
    api.inimigo('vaca_brava', { name: 'Vaca Brava', look: { k: 'boar', c: '#f0e8d8' }, hp: 90, dmg: 12, spd: 70,
      ai: 'charge', xp: 30, drops: [['leite_dourado', 0.8], ['carne_crua', 1]], animal: true });
    api.botao('🐄 Chamar uma Vaca Brava', () => { api.criar('vaca_brava'); api.aviso('Muuu! Uma Vaca Brava apareceu!', '#ffd040'); });
    api.botao('🥛 Ganhar Leite Dourado', () => api.dar('leite_dourado', 1));
    api.ao('diaNovo', dia => { const n = api.ler('presentes', 0) + 1; api.salvar('presentes', n); if (dia % 3 === 0) { api.dar('leite_dourado', 1); api.aviso('A Vaca Dourada deixou um presente! (' + n + ')', '#ffd040'); } });
    api.ao('inimigoMorto', m => { if (m.eid === 'vaca_brava') api.mensagem('Vaca vencida!', 'Que bicho bravo...'); });
  }
});
