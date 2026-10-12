import { cn } from "../../lib/cn";

export default function Table({ className, children, ...props }) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full min-w-160 text-left text-sm", className)} {...props}>
        {children}
      </table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead className="border-b border-line-soft">{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody className="divide-y divide-line-soft">{children}</tbody>;
}

export function TableRow({ className, children, ...props }) {
  return (
    <tr className={className} {...props}>
      {children}
    </tr>
  );
}

export function TableHeadCell({ className, children, ...props }) {
  return (
    <th scope="col" className={cn("px-4 py-3 font-medium text-ink", className)} {...props}>
      {children}
    </th>
  );
}

export function TableCell({ className, children, ...props }) {
  return (
    <td className={cn("px-4 py-4 align-middle text-body", className)} {...props}>
      {children}
    </td>
  );
}
