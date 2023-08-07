"use client";

import React, { useReducer, ChangeEvent } from "react";

interface RoleState {
  id: number;
  value: string;
}

interface Action {
  type: string;
  payload: {
    id: number;
    value: string;
  };
}

const initialState: RoleState[] = [
  { id: 1, value: "" },
  { id: 2, value: "" },
  { id: 3, value: "" },
  { id: 4, value: "" },
];

const rolesReducer = (state: RoleState[], action: Action): RoleState[] => {
  switch (action.type) {
    case "SET_ROLE":
      return state.map((role) =>
        role.id === action.payload.id
          ? { ...role, value: action.payload.value }
          : role
      );
    default:
      return state;
  }
};

const RolesInput: React.FC = () => {
  const [roles, dispatch] = useReducer(rolesReducer, initialState);

  const handleRoleChange = (
    event: ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const value = event.target.value;
    dispatch({ type: "SET_ROLE", payload: { id, value } });
  };

  return (
    <section className="flex flex-col mt-10 max-w-2xl">
      <label htmlFor="role" className="mb-2 md:text-lg lg:text-xl">
        Mention your roles based on your skills (e.g., UI/UX Designer, Frontend
        Developer, etc)
      </label>
      {roles.map((role: RoleState) => (
        <input
          key={role.id}
          type="text"
          id={`role${role.id}`}
          value={role.value}
          onChange={(event) => handleRoleChange(event, role.id)}
          placeholder={`Role ${role.id}`}
          required={role.id <= 2}
          className="mb-2 bg-dark-blue rounded-lg px-4 py-2 md:py-3 lg:py-4 md:mb-3 lg:mb-4"
        />
      ))}
    </section>
  );
};

export default RolesInput;