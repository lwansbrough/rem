export default (config) => {
  return (
`<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="${config.android.packageIdentifier}">

  <!-- Permissions, etc. here !-->

</manifest>
`);
}