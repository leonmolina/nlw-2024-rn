import { Link, LinkProps } from "expo-router"

interface Props extends LinkProps<string> {
  title: string;
}

export const LinkButton = ({ title, ...rest }: Props) => {
  return (
    <Link className="text-slate-300 text-center text-base font-body" {...rest}>
      {title}
    </Link>
  )
}