export interface StoreState {
  count: number;
  headerType: string;
  currentArticle?: {
    title: string;
    meta: {
      time: string;
      [key: string]: any;
    }
  };
  [key: string]: any;
}