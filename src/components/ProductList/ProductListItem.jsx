import { Typography } from "neetoui";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const ProductListItem = ({ imageUrl, name, offerPrice, slug }) => (
  <Link className="neeto-ui-border-black neeto-ui-rounded-xl flex w-48 flex-col items-center justify-between border p-4" to={`products/${slug}`}>
    <img alt={name} className="h-40 w-40" src={imageUrl} />
    <Typography className="text-center" weight="semibold">
      {name}
    </Typography>
    <Typography>${offerPrice}</Typography>
  </Link>
);

export default ProductListItem;