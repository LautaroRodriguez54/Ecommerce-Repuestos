import {SideBarLayout} from '../../components/ui/sideBarLayout/SideBarLayout.jsx';
import { adminActions } from '@/components/pageData.js';
export default function Page() {
  return (
    <SideBarLayout page='admin'buttons={adminActions} >
      <></>
    </SideBarLayout>
  );
}