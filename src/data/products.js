// Dados mockados — no lugar da chamada real ao Supabase (tabela Produto),
// que entra numa próxima entrega junto do backend.

export const CATEGORIES = ['Todas', 'Cervejas', 'Vinhos', 'Destilados', 'Sem álcool']

export const PRODUCTS = [
  {
    id: 'p1',
    name: 'IPA Session 350ml',
    store: 'Empório do Lúpulo',
    price: 9.9,
    icon: '🍺',
    category: 'Cervejas',
  },
  {
    id: 'p2',
    name: 'Vinho Tinto 750ml',
    store: 'Adega Central',
    price: 39.9,
    icon: '🍷',
    category: 'Vinhos',
  },
  {
    id: 'p3',
    name: 'Gin Artesanal 750ml',
    store: 'Bar do Zé',
    price: 79.9,
    icon: '🍸',
    category: 'Destilados',
  },
  {
    id: 'p4',
    name: 'Energético 269ml',
    store: 'Conveniência 24h',
    price: 7.5,
    icon: '🥤',
    category: 'Sem álcool',
  },
  {
    id: 'p5',
    name: 'Pilsen Premium 473ml',
    store: 'Empório do Lúpulo',
    price: 8.5,
    icon: '🍺',
    category: 'Cervejas',
  },
]
