import { useQuery } from "@tanstack/react-query";
import { GraphQLClient, gql } from "graphql-request";
import { useMemo } from "react";

export interface LooItem {
  id: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string;
  active: boolean;
  name: string;
  openingTimes: number;
  accessible: boolean;
  allGender: boolean;
  men: boolean;
  women: boolean;
  urinalOnly: boolean;
  children: boolean;
  babyChange: boolean;
  notes: string;
  removalReason: string;
  geohash: string;
}
export interface Loos {
  loos: {
    loos: Array<LooItem>;
  };
}

export const useLoos = (filters: { text: string }) => {
  const graphqlClient = useMemo(
    () => new GraphQLClient("https://www.toiletmap.org.uk/api"),
    []
  );

  return useQuery({
    queryKey: ["loos", filters.text],
    queryFn: async () => {
      const { loos }: Loos = await graphqlClient.request(
        gql`
          query GetLoos($filters: LooFilter!) {
            loos(filters: $filters) {
              loos {
                id
                createdAt
                updatedAt
                verifiedAt
                active
                name
                openingTimes
                accessible
                allGender
                men
                women
                urinalOnly
                children
                babyChange
                radar
                attended
                automatic
                noPayment
                paymentDetails
                notes
                removalReason
                geohash
              }
            }
          }
        `,
        { filters }
      );
      return loos.loos;
    },
  });
};
