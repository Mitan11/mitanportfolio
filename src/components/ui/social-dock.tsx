"use client";

import React from "react";
import { Dock, DockIcon } from "./dock";
import { socialLinks } from "@/data";

export type IconProps = React.HTMLAttributes<SVGElement>;

export function SocialDock() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Dock direction="middle">
        {socialLinks.map((link) => (
          <DockIcon key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={link.className}
            >
              {link.icon({ className: "size-4" })}
            </a>
          </DockIcon>
        ))}
      </Dock>
    </div>
  );
}
