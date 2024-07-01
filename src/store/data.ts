import { atom } from "recoil";

export type arrType = {
  id: number;
  name: string;
  isFolder: boolean;
  content: arrType;
}[];

export const arrState = atom({
  key: "arr",
  default: [
    {
      id: 0,
      name: "folder1",
      isFolder: true,
      content: [
        { id: 1, name: "file1", content: [], isFolder: false },
        { id: 2, name: "file2", content: [], isFolder: false },
      ],
    },
    {
      id: 3,
      name: "file3",
      isFolder: false,
      content: [],
    },
    {
      id: 4,
      name: "folder2",
      isFolder: true,
      content: [
        { id: 5, name: "file4", isFolder: false, content: [] },
        {
          id: 6,
          name: "folder3",
          isFolder: true,
          content: [{ id: 7, name: "file5", isFolder: false, content: [] }],
        },
        {
          id: 8,
          name: "folder4",
          isFolder: true,
          content: [{ id: 9, name: "file6", isFolder: false, content: [] }],
        },
      ],
    },
  ],
});
