"use client";
import {
  CheckCircledIcon,
  ClipboardCopyIcon,
} from "@radix-ui/react-icons";
import { useEffect, useState } from "react";

interface CopyButtonProps {
  value: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ value }) => {
  const [copied, setCopied] = useState(0);
  useEffect(() => {
    if (!copied) return;
    const timeout = setTimeout(() => {
      setCopied(0);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [copied]);

  if (copied) {
    return <CheckCircledIcon fontSize={10} />;
  }

  return (
    <ClipboardCopyIcon
      fontSize={10}
      onClick={() => {
        navigator.clipboard.writeText(value);
        setCopied(1);
      }}
    />
  );
};
