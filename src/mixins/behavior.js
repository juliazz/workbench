import _ from './pages.js';

export default Behavior({
  data: {
    $isIpx: _.data.$isIpx
  },
  methods: {
    $showToast: _.$showToast,
    $showLoading: _.$showLoading,
    $hideLoading: _.$hideLoading,
    $hideToast: _.$hideToast,
    $switchTab: _.$switchTab,
    $navigateTo: _.$navigateTo,
    $reLaunch: _.$reLaunch,
    $redirectTo: _.$redirectTo,
    $navigateBack: _.$navigateBack,
    $navigateToMiniProgram: _.$navigateToMiniProgram,
    $navigateBackMiniProgram: _.$navigateBackMiniProgram,
    $routeLink: _.$routeLink,
    $routeTo: _.$routeTo,
    $debounce: _.$debounce,
    $delay: _.$delay
  }
});
