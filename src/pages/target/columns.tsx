import { ColumnDef } from "@tanstack/react-table";

export type Target = {
  id: number;
  name: string;
  status: string;
  level: number;
  strength: number;
  speed: number;
  dexterity: number;
  defense: number;
  total: number;
  lastAction: string;
};

export const columns: ColumnDef<Target>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "lastAction",
    header: "Last Action",
  },
  {
    accessorKey: "strength",
    header: "Strength",
  },
  {
    accessorKey: "speed",
    header: "Speed",
  },
  {
    accessorKey: "dexterity",
    header: "Dexterity",
  },
  {
    accessorKey: "defense",
    header: "Defense",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
];
