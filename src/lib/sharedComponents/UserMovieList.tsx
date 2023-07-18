"use client";
import MovieCardSlider from "@/lib/sharedComponents/Containers/MovieCardSlider";
type Props = {
  emptyRender?: JSX.Element;
  listTitle: string;
  list: Array<number>;
};
export default function UserMovieList({ emptyRender, listTitle, list }: Props) {
  if (list.length === 0) {
    if (emptyRender) {
      return emptyRender;
    }
    return undefined;
  } else {
    return <MovieCardSlider movies={list} title={listTitle} />;
  }
}
