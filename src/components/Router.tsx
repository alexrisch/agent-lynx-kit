import { useCurrentPage } from "../atoms/page.js";
import { HomePage } from "../screens/HomePage.jsx";
import {ThreadScreen} from "../screens/ThreadsScreen.jsx";

export function Router(){
  const currentPage = useCurrentPage();

  if (currentPage.name === 'Home') {
    return (
      <HomePage />
    );
  }
  if (currentPage.name === 'Thread') {
    return (
      <ThreadScreen {...currentPage.params} />
    )
  }
}
