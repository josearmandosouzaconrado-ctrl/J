"""Configuração de cada cidade (teatro de operações) do jogo.

bbox: S, W, N, E (graus). zonas: (lat0, lat1, lon0, lon1, base, multiplicador, variação) para a altura dos prédios.
lugares: nome, lat, lon. 'base' e 'heliporto' são obrigatórios; 'docas' e 'portaavioes' só com costa.
focos: chaves de lugares onde o surto começa, em ordem. delegacias: (nome, lat, lon).
"""

CIDADES = {
    'miami': dict(
        nome='Miami', pais='EUA',
        bbox=(25.752, -80.210, 25.800, -80.118), costa=True, base_ang=0.43,
        zonas=[
            (25.7695, 25.7925, -80.1975, -80.1855, 25, 80, 140),   # Downtown
            (25.7525, 25.7695, -80.2010, -80.1860, 20, 70, 140),   # Brickell
            (25.7925, 25.8000, -80.1925, -80.1855, 18, 60, 110),   # Edgewater
            (25.7620, 25.7720, -80.1440, -80.1300, 15, 60, 70),    # South Pointe
            (25.7720, 25.8000, -80.1335, -80.1265, 10, 25, 60),    # Collins
            (25.7720, 25.8000, -80.1460, -80.1380, 10, 30, 60),    # West Ave
            (25.7650, 25.7800, -80.1850, -80.1550, 9, 6, 8),       # Porto: galpões
            (25.7500, 25.7650, -80.1550, -80.1300, 6, 20, 25),     # Fisher Island
        ],
        lugares={
            'base': ('Base Militar - PortMiami', 25.7745, -80.1700),
            'heliporto': ('Heliporto da Base', 25.7728, -80.1640),
            'docas': ('Docas da Marinha', 25.7705, -80.1570),
            'portaavioes': ('Porta-aviões USS Enterprise', 25.7660, -80.1218),
            'bayside': ('Bayside Marketplace', 25.7785, -80.1867),
            'kaseya': ('Kaseya Center', 25.7814, -80.1870),
            'freedom': ('Freedom Tower', 25.7800, -80.1897),
            'brickell': ('Brickell City Centre', 25.7670, -80.1932),
            'bayfront': ('Bayfront Park', 25.7752, -80.1860),
            'ocean': ('Ocean Drive', 25.7800, -80.1310),
            'lummus': ('Lummus Park', 25.7760, -80.1305),
            'southpointe': ('South Pointe Park', 25.7680, -80.1340),
            'watson': ('Watson Island', 25.7850, -80.1780),
            'star': ('Star Island', 25.7770, -80.1500),
            'fisher': ('Fisher Island', 25.7600, -80.1430),
            'havana': ('Little Havana', 25.7730, -80.2060),
            'overtown': ('Overtown', 25.7880, -80.2000),
            'convention': ('Centro de Convenções', 25.7950, -80.1340),
            'venetian': ('Venetian Islands', 25.7900, -80.1600),
        },
        saidas=[
            ('US-41 Tamiami Trail → Everglades', 25.7652, -80.2085, 'florida'),
            ('US-1 Sul → Homestead / Florida City', 25.7535, -80.1990, 'florida'),
            ('SR-836 → Turnpike → Interior da Flórida', 25.7745, -80.2085, 'florida'),
        ],
        focos=['bayside', 'brickell', 'ocean', 'kaseya', 'havana', 'southpointe', 'overtown', 'convention', 'lummus', 'freedom', 'venetian', 'fisher', 'star'],
        delegacias=[('Polícia de Miami (Downtown)', 25.7795, -80.1985), ('Polícia de Miami Beach', 25.7808, -80.1325)],
    ),
    'sf': dict(
        nome='São Francisco', pais='EUA',
        bbox=(37.768, -122.435, 37.832, -122.355), costa=True, base_ang=1.15, chance_alto=0.3,
        zonas=[
            (37.7870, 37.7980, -122.4050, -122.3920, 30, 90, 150),  # Financial District
            (37.7840, 37.7920, -122.4000, -122.3880, 25, 80, 160),  # Transbay / Salesforce
            (37.7820, 37.7900, -122.4120, -122.4000, 15, 40, 60),   # Union Square
            (37.7700, 37.7840, -122.4100, -122.3880, 10, 25, 40),   # SoMa
            (37.7880, 37.7980, -122.4200, -122.4050, 10, 25, 40),   # Nob Hill / Chinatown
            (37.8150, 37.8320, -122.3800, -122.3550, 7, 6, 8),      # Treasure Island: galpões
        ],
        altura_padrao=(6, 4, 6, 6),   # casas vitorianas de 2-3 andares
        lugares={
            'base': ('Base Naval - Treasure Island', 37.8235, -122.3705),
            'heliporto': ('Heliporto da Base', 37.8205, -122.3680),
            'docas': ('Docas da Marinha', 37.8160, -122.3700),
            'portaavioes': ('Porta-aviões USS Enterprise', 37.8250, -122.3960),
            'union': ('Union Square', 37.7880, -122.4075),
            'financial': ('Financial District', 37.7940, -122.3990),
            'ferry': ('Ferry Building', 37.7955, -122.3937),
            'chinatown': ('Chinatown', 37.7941, -122.4078),
            'wharf': ("Fisherman's Wharf", 37.8080, -122.4177),
            'northbeach': ('North Beach', 37.8006, -122.4100),
            'coit': ('Coit Tower', 37.8024, -122.4058),
            'oracle': ('Oracle Park', 37.7786, -122.3893),
            'soma': ('SoMa', 37.7780, -122.4050),
            'nobhill': ('Nob Hill', 37.7930, -122.4160),
            'lombard': ('Lombard Street', 37.8020, -122.4190),
            'alcatraz': ('Alcatraz', 37.8267, -122.4230),
            'salesforce': ('Salesforce Tower', 37.7897, -122.3972),
        },
        focos=['union', 'financial', 'wharf', 'chinatown', 'soma', 'northbeach', 'oracle', 'nobhill', 'ferry', 'lombard', 'coit', 'salesforce', 'alcatraz'],
        delegacias=[('Polícia de São Francisco (Central)', 37.7987, -122.4096), ('Polícia de São Francisco (Southern)', 37.7726, -122.3897)],
    ),
    'mexico': dict(
        nome='Cidade do México', pais='México',
        bbox=(19.408, -99.200, 19.445, -99.125), costa=False, base_ang=0.35, chance_alto=0.18,
        zonas=[
            (19.4180, 19.4360, -99.1850, -99.1500, 20, 60, 140),    # Paseo de la Reforma
            (19.4250, 19.4420, -99.1450, -99.1250, 10, 12, 25),     # Centro Histórico
            (19.4180, 19.4300, -99.1700, -99.1550, 12, 30, 40),     # Zona Rosa / Juárez
        ],
        altura_padrao=(8, 6, 10, 14),
        lugares={
            'base': ('Base Militar - Bosque de Chapultepec', 19.4195, -99.1905),
            'heliporto': ('Heliporto da Base', 19.4175, -99.1865),
            'zocalo': ('Zócalo', 19.4326, -99.1332),
            'bellas': ('Palácio de Bellas Artes', 19.4352, -99.1412),
            'angel': ('Anjo da Independência', 19.4270, -99.1677),
            'torrelat': ('Torre Latinoamericana', 19.4339, -99.1405),
            'alameda': ('Alameda Central', 19.4357, -99.1450),
            'revolucion': ('Monumento à Revolução', 19.4361, -99.1546),
            'roma': ('Colonia Roma', 19.4150, -99.1620),
            'condesa': ('Condesa', 19.4130, -99.1720),
            'zonarosa': ('Zona Rosa', 19.4245, -99.1630),
            'juarez': ('Colonia Juárez', 19.4280, -99.1550),
            'polanco': ('Polanco', 19.4330, -99.1950),
            'reforma': ('Torre Reforma', 19.4237, -99.1750),
        },
        focos=['zocalo', 'angel', 'roma', 'bellas', 'zonarosa', 'revolucion', 'condesa', 'torrelat', 'juarez', 'alameda', 'polanco', 'reforma'],
        delegacias=[('Polícia da Cidade do México (SSC)', 19.4300, -99.1490), ('Polícia do Centro Histórico', 19.4310, -99.1380)],
    ),
    'florida': dict(
        nome='Interior da Flórida', pais='EUA', zoom=16, rural=True,
        bbox=(25.430, -80.600, 25.520, -80.370), costa=False, base_ang=0.72, chance_alto=0.25,
        zonas=[
            (25.4800, 25.4970, -80.3950, -80.3700, 8, 10, 6),     # hangares da base aérea
            (25.4640, 25.4740, -80.4830, -80.4720, 6, 10, 10),    # centro de Homestead
        ],
        altura_padrao=(3.5, 2.5, 3, 5),     # casas térreas e galpões de fazenda
        lugares={
            'base': ('Homestead Air Reserve Base', 25.4900, -80.3860),
            'heliporto': ('Heliporto da Base Aérea', 25.4950, -80.3920),
            'homestead': ('Centro de Homestead', 25.4687, -80.4776),
            'floridacity': ('Florida City', 25.4479, -80.4792),
            'outlet': ('Florida Keys Outlet', 25.4470, -80.4740),
            'speedway': ('Homestead-Miami Speedway', 25.4515, -80.4085),
            'leisure': ('Leisure City', 25.4950, -80.4300),
            'naranja': ('Naranja', 25.5160, -80.4230),
            'coral': ('Coral Castle', 25.5003, -80.4445),
            'redland': ('Redland (fazendas)', 25.5050, -80.5200),
            'fruta': ('Robert Is Here (barraca de frutas)', 25.4475, -80.5007),
            'aeroporto': ('Aeroporto de Homestead', 25.4990, -80.5540),
            'everglades': ('Borda dos Everglades', 25.4700, -80.5850),
            'turnpike': ("Florida's Turnpike", 25.4600, -80.4600),
        },
        focos=['homestead', 'floridacity', 'leisure', 'redland', 'outlet', 'naranja', 'fruta', 'speedway', 'coral', 'aeroporto', 'everglades', 'turnpike'],
        delegacias=[('Polícia de Homestead', 25.4725, -80.4777), ('Polícia de Florida City', 25.4485, -80.4795)],
        saidas=[
            ('US-1 Norte → Miami', 25.5170, -80.4287, 'miami'),
            ("Florida's Turnpike → Miami", 25.5170, -80.4036, 'miami'),
        ],
    ),
}
