export interface CategoryProps {
  title: string;
}

export interface ListCategoryProps extends CategoryProps {
  items: string[];
}

export interface TextCategoryProps extends CategoryProps {
  content: string;
}
