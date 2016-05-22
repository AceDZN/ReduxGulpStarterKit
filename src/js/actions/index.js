
export function selectPlatform(platform){
  return {
    type: 'PLATFORM_SELECTED',
    payload: platform
  }
  console.log(platform.title,"platforms");
}
