import Search from './Search'
import Recommend from './Recommend'
import DownloadFree from './DownloadFree'

export default function HomePage() {
  return (
    <div >
      <Search></Search>
      <Recommend></Recommend>
      <DownloadFree></DownloadFree>
    </div>
  );
}
