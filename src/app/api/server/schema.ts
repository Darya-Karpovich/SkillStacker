import gql from "graphql-tag";

export const typeDefs = gql`
  type Skill {
    name: String!
    experienceValue: Float!
    likeValue: Float!
    id: ID!
  }

  type User {
    id: ID!
    name: String!
    surname: String!
    email: String!
    password: String!
    skills: [Skill!]!
  }

  type UserDetails {
    id: ID!
    name: String!
    surname: String!
  }

  type UserSkill {
    id: ID!
    likeValue: Float!
    experienceValue: Float!
    user: UserDetails!
    skill: Skill!
  }

  input GetUserSkillsInput {
    userId: ID!
  }

  input UserInput {
    id: ID!
  }

  input SkillInput {
    experienceValue: Float!
    likeValue: Float!
    id: ID!
  }

  input CreateUserInput {
    name: String!
    surname: String!
    email: String!
    password: String!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }

  input AddUserSkillInput {
    skillId: ID!
    experienceValue: Float!
    likeValue: Float!
  }

  input UpdateUserSkillsInput {
    skills: [SkillInput!]!
  }
  input DeleteUserSkillsInput {
    skillIds: [ID]!
  }

  type Query {
    skills: [Skill!]!
    users: [User!]!
    user(input: UserInput!): User!
    currentUser: User!
    userSkillsWithUserDetails: [UserSkill!]!
  }

  type Mutation {
    createUser(input: CreateUserInput!): String!
    loginUser(input: LoginUserInput!): String!
    addUserSkill(input: AddUserSkillInput!): Skill!
    updateUserSkills(input: UpdateUserSkillsInput!): [ID!]!
    deleteUserSkills(input: DeleteUserSkillsInput!): Boolean!
  }
`;

export default typeDefs;
