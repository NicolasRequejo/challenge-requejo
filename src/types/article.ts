export interface RawArticle {
  id: number;
  titulo: string;
  descripcion: string;
  precio: number;
  imagen: string;
  rating: number;
  categoria: string;
  fav?: boolean;
}

export interface Article {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  category: string;
  initialFavorite: boolean;
}

export interface CartItem extends Article {
  quantity: number;
}
