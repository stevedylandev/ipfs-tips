import { LucideIcon, Book, MonitorDown, PartyPopper } from "lucide-react";

export interface Link {
  name: string;
  description: string;
  icon: LucideIcon
  url: string;
}

export const links: Link[] = [
  {
    name: "Docs",
    description: "Dive into the official IPFS protocol",
    url: "https://docs.ipfs.tech",
    icon: Book
  },
  {
    name: "Install",
    description: "Download and start using IPFS",
    url: "https://docs.ipfs.tech/install",
    icon: MonitorDown
  },
  {
    name: "Providers",
    description: "Use third party providers",
    url: "https://pinata.cloud",
    icon: PartyPopper
  },
]
