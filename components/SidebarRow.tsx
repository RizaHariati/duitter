import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}
const SidebarRow = ({ Icon, title, onClick }: Props) => {
  return (
    <button onClick={() => onClick?.()} className="btn">
      <Icon className="btn-icon" />
      <p className="hidden md:inline-block">{title}</p>
    </button>
  );
};

export default SidebarRow;
