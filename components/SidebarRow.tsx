import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
}
const SidebarRow = ({ Icon, title }: Props) => {
  return (
    <button className="btn">
      <Icon className="btn-icon" />
      <p className="hidden md:inline-block">{title}</p>
    </button>
  );
};

export default SidebarRow;
