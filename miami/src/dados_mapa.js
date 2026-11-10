// Os dados da cidade escolhida são carregados antes do jogo (www/mapas/<cidade>.js)
export const { META, GRADE_RLE, PREDIOS } = window.MAPA_DADOS;
export const CIDADE = META.cidade || 'miami';
export const COSTA = META.costa !== false;
