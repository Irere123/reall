import { User } from "@reall/client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useWrappedConn } from "../../shared-hooks/useConn";
import { PageComponent } from "../../types/PageComponent";
import { SearchHeader } from "../../ui/header/SearchHeader";
import { InfoText } from "../../ui/InfoText";
import { UserSearchResult } from "../../ui/Search/SearchResult";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { MiddlePanel } from "../layouts/GridPanels";

interface SearchPageProps {}

export const SearchPage: PageComponent<SearchPageProps> = () => {
  const router = useRouter();
  const [results, setResults] = useState([] as User[]);
  const [searchLoading, setSearchLoading] = useState(false);
  const conn = useWrappedConn();

  return (
    <DefaultDesktopLayout>
      <HeaderController embed={{}} title={"Search"} />

      <MiddlePanel
        stickyChildren={
          <SearchHeader
            onSearchChange={(e) => {
              console.log(e.target.value);
              setSearchLoading(true);
              conn.query.search(e.target.value).then((r) => {
                setResults(r?.items);
                setSearchLoading(false);
              });
            }}
            searchLoading={searchLoading}
            searchPlaceholder={"Search for people"}
            onBackClick={() => router.back()}
          />
        }
      >
        <div className="h-full w-full">
          {results &&
            results.map((user, i) => {
              if ("username" in user) {
                return (
                  <UserSearchResult
                    user={user}
                    className="mb-3"
                    onClick={() => router.push(`/u/${user.username}`)}
                    key={i}
                  />
                );
              }
            })}
          {!results?.length && (
            <InfoText className="pr-4 pl-5 py-3">
              There no results found
            </InfoText>
          )}
        </div>
      </MiddlePanel>
    </DefaultDesktopLayout>
  );
};

SearchPage.ws = true;
