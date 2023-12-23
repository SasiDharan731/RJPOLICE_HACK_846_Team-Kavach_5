// data.js
export const nodes = [
    {
      id: 1,
      name: "Task 1",
      deadline: new Date("2023-12-31"),
      type: "Type A",
      isComplete: true,
      nodes: [
        {
          id: 11,
          name: "Subtask 1.1",
          deadline: new Date("2023-12-15"),
          type: "Type B",
          isComplete: false,
        },
        {
          id: 12,
          name: "Subtask 1.2",
          deadline: new Date("2023-12-20"),
          type: "Type A",
          isComplete: true,
        },
      ],
    },
    {
      id: 2,
      name: "Task 2",
      deadline: new Date("2023-11-30"),
      type: "Type C",
      isComplete: false,
      nodes: [
        {
          id: 21,
          name: "Subtask 2.1",
          deadline: new Date("2023-11-25"),
          type: "Type B",
          isComplete: true,
        },
      ],
    },
    {
        id: 1,
        name: "Task 1",
        deadline: new Date("2023-12-31"),
        type: "Type A",
        isComplete: true,
        nodes: [
          {
            id: 11,
            name: "Subtask 1.1",
            deadline: new Date("2023-12-15"),
            type: "Type B",
            isComplete: false,
          },
          {
            id: 12,
            name: "Subtask 1.2",
            deadline: new Date("2023-12-20"),
            type: "Type A",
            isComplete: true,
          },
        ],
      },
      {
        id: 2,
        name: "Task 2",
        deadline: new Date("2023-11-30"),
        type: "Type C",
        isComplete: false,
        nodes: [
          {
            id: 21,
            name: "Subtask 2.1",
            deadline: new Date("2023-11-25"),
            type: "Type B",
            isComplete: true,
          },
        ],
      },
      {
        id: 1,
        name: "Task 1",
        deadline: new Date("2023-12-31"),
        type: "Type A",
        isComplete: true,
        nodes: [
          {
            id: 11,
            name: "Subtask 1.1",
            deadline: new Date("2023-12-15"),
            type: "Type B",
            isComplete: false,
          },
          {
            id: 12,
            name: "Subtask 1.2",
            deadline: new Date("2023-12-20"),
            type: "Type A",
            isComplete: true,
          },
        ],
      },
      {
        id: 2,
        name: "Task 2",
        deadline: new Date("2023-11-30"),
        type: "Type C",
        isComplete: false,
        nodes: [
          {
            id: 21,
            name: "Subtask 2.1",
            deadline: new Date("2023-11-25"),
            type: "Type B",
            isComplete: true,
          },
        ],
      },
  ];
  