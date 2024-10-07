import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const ObjectKeys = <Obj>(obj: Obj): (keyof Obj)[] => {
	if (!obj) {
		obj = {} as Obj
	}
	return Object.keys(obj as object) as (keyof Obj)[]
}
