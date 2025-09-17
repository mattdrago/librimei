import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MouseEventHandler } from "react";

interface AuthorButtonProps {
  display?: boolean;
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  icon: IconDefinition;
}

export function AuthorButton({
  display=true,
  title,
  onClick,
  icon,
}: AuthorButtonProps) {
  return display ? (
    <button className="block" type="button" title={title} onClick={onClick}>
      <FontAwesomeIcon icon={icon} />
    </button>
  ) : (
    <span className="block w-4"></span>
  );
}
