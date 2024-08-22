declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// do the same for png
declare module "*.png" {
  const content: DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>>;
  export default content;
}