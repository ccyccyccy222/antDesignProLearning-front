/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState || {};
  return {
    canChef:currentUser && currentUser.access === 'chef'||currentUser && currentUser.access === 'admin',
    canFM:currentUser && currentUser.access === 'financial_manager'||currentUser && currentUser.access === 'admin',
    canFOM:currentUser && currentUser.access === 'front_office_manager'||currentUser && currentUser.access === 'admin',
    canAdmin: currentUser && currentUser.access === 'admin',
  };
}
