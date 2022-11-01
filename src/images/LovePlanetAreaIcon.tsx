import * as React from 'react'
import { useId } from 'react'
export const LovePlanetAreaIcon: React.FC<
  React.SVGProps<SVGSVGElement> & { title?: string }
> = (props) => {
  const id = useId()
  return (
    <svg
      width={132}
      viewBox={'0 0 132 80'}
      fill={'none'}
      xmlns={'http://www.w3.org/2000/svg'}
      {...props}
    >
      <g clipPath={`url(#love-planet-area_svg__a${id})`}>
        <path
          d={
            'M36.691 74.015a24.049 24.049 0 0 1-4.205-3.248 8.285 8.285 0 0 1-2.014-3.147c-.756-2.319.124-4.969 2.58-5.756 1.298-.401 2.708.145 3.793.963 1.085-.817 2.495-1.363 3.792-.963 2.457.787 3.343 3.437 2.587 5.756a8.285 8.285 0 0 1-2.002 3.147 24.269 24.269 0 0 1-4.206 3.248l-.165.106-.16-.106ZM62.278 54.481a37 37 0 0 1-6.449-5.103 13.059 13.059 0 0 1-3.088-4.945c-1.16-3.644.19-7.809 3.958-9.045 1.988-.631 4.151.227 5.814 1.512 1.664-1.283 3.826-2.142 5.815-1.512 3.767 1.236 5.126 5.4 3.966 9.045a13.062 13.062 0 0 1-3.07 4.945 37.336 37.336 0 0 1-6.448 5.103l-.254.168-.244-.168ZM20.963 41.983a61.041 61.041 0 0 1-10.654-8.351 21.34 21.34 0 0 1-5.102-8.092c-1.916-5.963.314-12.778 6.539-14.801 3.285-1.033 6.859.372 9.606 2.475 2.749-2.1 6.32-3.505 9.607-2.475 6.224 2.023 8.469 8.838 6.554 14.8a21.342 21.342 0 0 1-5.073 8.093 61.602 61.602 0 0 1-10.654 8.351l-.419.274-.404-.274Z'
          }
          fill={'#fff'}
        />
        <path
          fill-rule={'evenodd'}
          clip-rule={'evenodd'}
          d={
            'M37.692 17.826a64.544 64.544 0 0 0-12.424 7.954 47.195 47.195 0 0 0-.75.627c-.557.469-1.108.943-1.648 1.428a64.716 64.716 0 0 0-8.558 9.391 61.045 61.045 0 0 0 2.767 2.144 61.07 61.07 0 0 1 20.377-17.536l.067.06c.165.15.336.308.622.303a.229.229 0 0 0 .005-.005 12.849 12.849 0 0 0-.458-4.366Zm3.128 3.348a15.534 15.534 0 0 0-.7-4.475 65.959 65.959 0 0 1 4.544-1.8c.63-.222 1.265-.44 1.906-.645.356-.114.711-.22 1.068-.327l.066-.02a65.57 65.57 0 0 1 11.71-2.389c.64-.07 1.28-.128 1.92-.179a64.623 64.623 0 0 1 6.123-.201c.102.001.205.005.307.008l.223.006c.873.02 1.745.055 2.613.11h.019l.015.001a64.12 64.12 0 0 1 2.699.233l.454.046c.57.065 1.14.139 1.707.218a62.718 62.718 0 0 1 4.505.792 65.44 65.44 0 0 1 7.723 2.146 65.402 65.402 0 0 1 15.13 7.522 65.137 65.137 0 0 1 10.754 9.04 64.395 64.395 0 0 1 7.807 9.968 64.454 64.454 0 0 1 4.568 8.564 65.182 65.182 0 0 1 4.673 15.785 63.99 63.99 0 0 1 .771 12.756 63.324 63.324 0 0 1-.561 6.27 63.311 63.311 0 0 1-.817 4.62 67.723 67.723 0 0 1-.444 1.908 64.466 64.466 0 0 1-5.312 14.149 64.841 64.841 0 0 1-11.927 16.274 64.1 64.1 0 0 1-7.19 6.161 64.476 64.476 0 0 1-5.526 3.646 65.371 65.371 0 0 1-13.269 5.935 65.2 65.2 0 0 1-24.063 2.991 65.178 65.178 0 0 1-9.365-1.289 65.472 65.472 0 0 1-22.853-9.669 65.113 65.113 0 0 1-10.754-9.041 63.802 63.802 0 0 1-4.132-4.768 64.08 64.08 0 0 1-8.242-13.763 65.162 65.162 0 0 1-5.11-18.99 66.495 66.495 0 0 1-.273-3.194 63.842 63.842 0 0 1 1.315-17.247 64.483 64.483 0 0 1 4.4-13.263 64.807 64.807 0 0 1 5.463-9.672c.906.74 1.832 1.456 2.777 2.145-.094.139-.188.278-.28.418.29.2.56.448.8.668.198.183.377.347.53.45.125.084.043.341-.04.604-.064.199-.128.401-.104.534.017.104.094.219.175.342.085.128.176.265.213.407.069.268.055.524.042.752-.02.37-.037.665.317.808.287.116.544-.084.802-.284.3-.232.6-.465.948-.202.398.301.258.61.106.944-.097.214-.199.438-.168.677.052.418.26.78.463 1.134.148.258.294.512.377.782.087.286.21.98.184 1.252-.023.248-.186.426-.342.595-.174.19-.338.37-.29.626.082.436.542.673.985.9.356.183.7.36.83.63.176.365.087 1.101.03 1.578l-.028.242c-.111 1.19-.536 2.293-1.008 3.454-.17.416-.393.84-.615 1.262-.355.674-.707 1.344-.835 1.969-.059.289-.048.578-.037.862.01.26.02.514-.024.759-.065.366-.22.674-.373.983-.158.315-.316.63-.378 1.006.136.792.401 1.468.67 2.152l.163.42c.131.344.243.697.355 1.047.159.499.315.992.523 1.44.197.427.639 1.234 1.02 1.566.265.23.523.218.838.202.205-.01.434-.021.704.032.519.103 1.407.506 1.69.916.195.283.333.692.475 1.113.086.257.174.518.278.758.06.138.118.281.177.425.23.556.464 1.12.729 1.47.15.199.422.36.7.525.393.233.8.476.918.849.09.288-.054.514-.198.74-.147.233-.295.466-.195.77.164.496.755.578 1.36.662.56.078 1.132.157 1.387.57.14.228.16.51.177.778.016.246.031.48.14.65.197.314.733.468 1.12.58.147.042.272.078.35.114.135.063.265.148.395.233.36.233.714.464 1.145.22.19-.523-.227-.783-.631-1.035-.18-.113-.359-.224-.479-.356-.23-.252-.424-.638-.639-1.066-.195-.391-.408-.817-.683-1.205-.19-.27-.46-.473-.723-.67-.24-.18-.473-.355-.633-.571-.164-.223-.283-.466-.397-.7-.127-.261-.25-.512-.426-.712-.135-.155-.354-.312-.578-.473-.314-.226-.639-.459-.756-.702-.726-1.51.77-2.584 1.63-1.541.29.354.355.757.422 1.167.05.317.103.639.26.945.198.384.694.658 1.17.921.233.129.461.255.648.39.19.137.37.276.546.411.407.314.784.604 1.163.79.167.413.192.49.299.923.32.197.653.38.99.564.455.249.915.5 1.355.796.14.094.289.189.442.287.984.627 2.17 1.382 2.461 2.789.05.235 0 .49-.048.744-.058.3-.116.603-.014.879.165.44.877.793 1.49.977.244.074.479.16.702.243.37.136.71.262 1.016.302.168.022.385-.001.61-.025.235-.025.48-.051.69-.029.275.029.55.142.835.26.28.114.57.234.883.284.405.066.86.075 1.334.084.444.01.904.019 1.357.074l.08.01c.893.11 2.05.252 2.658.06.313-.097.584-.358.862-.625.282-.272.571-.55.919-.671.966-.34 1.852.196 2.734.729.593.357 1.183.714 1.796.805.252.039.528-.006.818-.054a6.51 6.51 0 0 1 .462-.064 3.53 3.53 0 0 1 .648.01c.126.01.254.02.39.022.37.005.755-.059 1.127-.12.414-.069.81-.135 1.15-.099.521.055 1.089.48 1.637.891.47.352.925.693 1.324.78.063.153.113.331.163.51.087.308.174.617.33.79.302.216.588.202.918.187.208-.01.434-.021.691.025.394.073.718.322 1.034.565.322.248.636.49 1.008.53.129.015.337-.027.562-.072.214-.042.443-.088.631-.091.425-.007.781.165 1.106.322.416.201.778.377 1.162.116.37-.248.295-.627.217-1.03-.017-.086-.035-.173-.048-.261.04-.087.08-.18.12-.277.173-.418.368-.888.779-1.03.658-.225 1.015.277 1.42.847.099.14.2.283.31.42.142.178.335.326.53.476.238.183.479.368.627.61.469.755 1.162 3.237 1.151 3.781-.007.37-.236.692-.487 1.046-.203.286-.421.592-.55.961-.07.202-.096.432-.118.646-.022.198-.041.381-.094.514-.096.243-.255.428-.407.607-.16.187-.314.365-.378.592-.043.148-.055.382-.068.614a5.743 5.743 0 0 1-.033.437c-.025.188-.058.369-.09.545-.134.725-.25 1.361.282 2.087.117.159.323.264.532.37.276.141.559.284.65.562.095.291-.133.666-.366 1.052-.228.376-.462.762-.409 1.088.05.313.364.708.675 1.099.176.222.351.442.477.645.163.266.602.368 1 .461.24.056.463.109.603.191.43.251.849.617 1.271.988.202.177.405.354.61.521.63.508 1.237 1.099 1.839 1.686.602.587 1.2 1.169 1.811 1.66.238.19.497.364.755.536.439.294.874.586 1.194.953.13.15.224.329.315.503.089.171.176.337.293.467.82.913 3.277 1.354 4.53 1.536.275.04.55.041.821.043.307.002.61.004.9.061.83.164 2.566.76 3.12 1.259.43.388.955 1.396 1.372 2.196l.19.362c.355.669.528 1.284.714 1.944.118.418.24.854.419 1.334.119.32.282.627.444.935.127.24.254.479.36.724 13.988-8.494 23.787-22.143 27.64-37.541-.809-.366-1.606-.67-2.433-.473-.182.043-.342.135-.507.23-.158.091-.321.185-.513.242-.351.105-.836.117-1.324.128-.416.01-.833.02-1.173.088-.205.041-.424.136-.633.226-.269.116-.519.224-.697.2-.259-.037-.463-.27-.66-.497-.168-.193-.332-.38-.521-.435-.197-.057-.469-.042-.754-.026-.191.011-.388.022-.571.012-.163-.01-.32-.023-.474-.036-.541-.046-1.046-.09-1.647.058a1.531 1.531 0 0 0-.325.143c-.143.076-.292.155-.451.179-.271.041-.561-.091-.852-.225-.179-.081-.358-.164-.533-.205-.135-.032-.266-.057-.391-.081-.409-.079-.76-.146-1.016-.416-.015-1.036-.609-1.389-1.171-1.722-.284-.169-.559-.332-.747-.577-.135-.175-.225-.388-.312-.595-.081-.193-.16-.381-.272-.528-.277-.364-.725-.515-1.255-.694-.105-.035-.213-.071-.324-.11a13.518 13.518 0 0 0-.11-.04c-1.156-.412-2.208-.787-3.593-.523-.318.06-.606.203-.91.354-.297.147-.608.302-.976.394-.789.2-1.983-.169-2.774-.64a10.862 10.862 0 0 1-.735-.492c-.385-.274-.71-.505-1.086-.6-.26-.068-.531-.061-.79-.055-.296.007-.574.014-.796-.092-.102-.05-.162-.14-.237-.257-.06-.093-.132-.202-.243-.318-.098-.102-.2-.187-.298-.268-.292-.24-.54-.445-.46-.945-.322-.052-.415.132-.516.332-.093.184-.194.383-.487.424-.752-.562-1.3-.766-2.404-.177-.228.122-.37.348-.515.58-.174.277-.352.561-.69.68-.257.09-.534.02-.837-.054-.298-.075-.621-.155-.974-.095-.277.048-.55.178-.803.298-.235.112-.451.215-.637.236-.37.044-.636-.095-.93-.25-.188-.098-.387-.202-.631-.269-.46-.127-1.332-.309-1.542-.234-.266.095-.43.4-.599.72-.252.473-.52.976-1.164.862-.312-.206-.206-.475-.103-.738.106-.269.21-.531-.146-.712-.4-.203-.585.134-.76.45-.057.105-.113.207-.175.287l-.08.103c-.257.335-.51.664-.836.919-.38.298-.72.456-1.036.603-.352.164-.674.313-.987.627-.39.39-.425.793-.468 1.276-.018.2-.037.414-.082.647-.129.652-.565 1.674-1.014 1.854-.33.132-.75-.05-1.16-.228-.267-.115-.53-.229-.757-.25-1.052-.103-1.59.397-2.132.9-.351.327-.704.654-1.199.82-1.169.39-3.456-.962-3.752-2.076-.09-.346-.13-.806-.172-1.287-.04-.465-.082-.95-.173-1.368-.072-.33-.03-.626.01-.913.043-.304.084-.597-.012-.907-.25-.805-1.531-1.081-2.086-1.008-.548.071-1.127.334-1.731.608-.846.384-1.742.791-2.678.729-.268-.232-.162-.52-.049-.824.063-.168.127-.341.131-.513.003-.13-.033-.27-.07-.413-.04-.16-.083-.325-.075-.486.012-.24.106-.48.203-.725.091-.233.184-.47.21-.718.021-.204-.004-.44-.031-.687-.024-.222-.05-.451-.042-.673.008-.244.058-.462.105-.66.055-.236.103-.443.064-.633-.096-.462-.426-.923-.872-1.103-1.086.41-1.794.699-2.33 1.181-.603.545-.692 1.265-.778 1.966-.089.727-.175 1.433-.832 1.9-.278.197-.647.36-1.011.52-.22.097-.438.194-.633.296-.165.087-.337.203-.512.321-.296.2-.602.406-.91.498-.579.174-1.764-.051-2.225-.307-.412-.23-1.678-1.62-1.855-1.881-1.195-1.763-1.155-3.747-.847-5.337a3.85 3.85 0 0 1 .114-.417c.064-.204.129-.409.14-.61.017-.275-.074-.591-.165-.909-.08-.276-.159-.553-.168-.804-.04-.921.835-1.79 1.532-2.483l.175-.175c.245-.246.467-.515.688-.783.51-.619 1.015-1.232 1.788-1.537.494-.197 1.255-.276 1.824-.335l.19-.02c.248-.027.49.003.722.031.266.032.52.063.756.006.806-.192 1.09-.688 1.41-1.244.178-.311.367-.642.666-.948.568-.098.999-.293 1.42-.484.382-.174.755-.343 1.216-.434.347-.068.699.045 1.029.151.3.097.581.187.824.13.209-.049.372-.204.534-.358.169-.16.337-.32.554-.354.413-.065 1.362.568 1.58 1.024.124.26.12.549.114.843-.005.347-.011.7.195 1.024.564.294 1.288.277 2.011.26.343-.007.685-.015 1.01.01.31-.479-.017-.987-.335-1.483-.122-.19-.243-.377-.326-.561-.068-.15-.106-.299-.145-.445-.036-.142-.072-.28-.133-.413a4.318 4.318 0 0 0-.34-.586c-.142-.219-.28-.429-.352-.649-.612-1.858.608-3.218 1.632-4.359l.028-.031c.215-.241.386-.53.55-.809.175-.296.343-.58.55-.78.268-.262.517-.454.752-.636.259-.2.502-.387.74-.644l.299-.318c.7-.746 1.317-1.402 1.827-2.182.058-.634-.228-1.297-.496-1.919-.141-.328-.278-.644-.356-.94.174-.201.393-.204.621-.206.154-.002.313-.004.464-.067.355-.202.397-.618.436-1.01.024-.235.047-.46.134-.628.071-.137.247-.29.425-.445.156-.137.314-.274.401-.402.206-.303.311-.627.408-.926.117-.359.22-.68.473-.884.084-.068.24-.132.408-.202.166-.068.344-.141.479-.229.17-.11.352-.312.556-.54.227-.253.483-.539.784-.762.162-.12.432-.25.695-.378.34-.164.667-.322.727-.441.08-.158-.025-.402-.128-.64-.068-.157-.134-.31-.147-.436-.127-1.26 1.2-2.175 2.34-2.963.302-.208.59-.407.835-.601.198-.157.39-.33.586-.506.617-.554 1.25-1.124 2.081-1.223.012.343-.185.545-.37.734-.233.237-.445.455-.2.904.47.86 1.234-.153 1.73-.812.149-.198.274-.365.36-.437.361-.309.887-.63 1.44-.969.52-.317 1.063-.649 1.517-.998l.14-.108c.84-.64 2.124-1.621.968-2.358-.441.114-.645.512-.851.917-.143.28-.287.562-.513.757-.228.111-.348.029-.472-.056-.104-.072-.211-.146-.388-.107-.176.039-.289.158-.4.277-.122.129-.243.257-.444.286-.386.054-1.079-.352-1.273-.758-.328-.69-.04-1.27.252-1.86.154-.313.31-.627.377-.961-.376-.54-.93-.312-1.523-.07-.397.163-.81.332-1.196.283-.111-.618.372-1.231 1.034-1.568.542-.276 1.848-.61 2.279-.439.113.046.167.166.228.3.076.166.161.354.382.452.437.197.842.029 1.258-.184-.045-.44-.393-.47-.704-.497-.254-.021-.483-.04-.5-.283.443-.543 1.237-.741 2.026-.938.476-.119.95-.237 1.344-.43.493-.242.932-.732 1.327-1.171.088-.098.174-.194.257-.283.053-.057.107-.118.163-.18.404-.455.887-.999 1.525-.724.242.36-.017.669-.255.952-.085.1-.166.197-.222.293-.727 1.223-1.445 2.587-1.898 3.883.432.214.944.042 1.495-.142.261-.087.531-.177.805-.23.209-.04.456-.067.7-.093.147-.015.293-.03.427-.05.194-.026.388-.072.573-.116.215-.052.419-.1.599-.113.28-.02.503.086.717.188.249.117.485.229.782.134.909-.292.597-1.267-.115-1.712-.011-.187-.007-.354-.003-.505.01-.392.016-.678-.246-.943-.312-.317-.75-.21-1.17-.106-.483.119-.944.232-1.165-.312-.156-.383 0-.596.168-.826.114-.156.234-.32.266-.55-.265-.631-.1-1.063.06-1.48.154-.4.302-.787.06-1.326-.123-.274-.317-.338-.556-.417-.162-.053-.345-.114-.54-.25-.107-.076-.21-.198-.316-.322-.137-.161-.276-.325-.427-.387-.317-.13-.698-.14-1.076-.15-.675-.018-1.343-.036-1.628-.731-.107-.283-.164-.558-.222-.834-.075-.357-.15-.717-.332-1.102a7.698 7.698 0 0 0-.384-.69 63.682 63.682 0 0 0-2.417-.914c-.103.157-.202.33-.304.505-.232.4-.473.818-.781 1.105-.41.383-1.02.864-1.534.929-.334.04-1.115-.215-1.36-.804a.082.082 0 0 1-.002-.008c0-.004-.001-.007-.004-.012-.137-.35-.06-.568.027-.812.077-.215.16-.45.109-.812-.15-.24-.363-.247-.625-.254a1.825 1.825 0 0 1-.585-.086c-.213-.074-.43-.204-.652-.337-.413-.247-.841-.504-1.282-.428-.192.033-.379.182-.562.327-.141.112-.28.223-.418.277-.478.19-.981.182-1.454.176-.14-.002-.276-.004-.408 0-.326.007-.627.044-.879.191-.02.012-.036.028-.052.044-.01.01-.02.02-.032.029-.35.268-.43.716-.51 1.165-.016.089-.031.178-.05.265-.072.357-.185.689-.486.898.19.353.017.741-.147 1.11-.118.266-.232.523-.204.749.028.228.16.448.284.656.074.124.145.244.19.358 1.22 3.091-.92 5.411-4.044 6.317-.26.475-.174 1.047-.088 1.626.054.362.109.726.08 1.07-.063.754-.814 1.779-1.502 1.937-.509.117-1.296-.39-1.446-.847-.073-.222-.005-.445.062-.664.103-.338.203-.664-.222-.96-.029-.188.105-.394.248-.616.209-.32.44-.677.234-1.067-.247-.471-.748-.287-1.345-.067-.273.1-.566.208-.864.264-.692.13-1.69.024-2.385-.11-.307-.06-.617-.17-.933-.282-.625-.22-1.272-.45-1.974-.317a3.01 3.01 0 0 0-.62.212c-.314.134-.582.25-.817.102-.288-.179-.257-.552-.232-.847.01-.128.02-.241.001-.317-.075-.2-.314-.271-.552-.342-.233-.07-.465-.138-.544-.327-.114-.267.344-1.37.549-1.703.324-.532.957-1.183 1.571-1.814l.307-.316c.683-.71 1.49-1.495 2.207-2.018.149-.109.322-.186.494-.262.18-.08.358-.16.506-.275.352-.274.62-.59.88-.897.29-.341.57-.672.949-.928.203-.136.431-.234.666-.335a5.44 5.44 0 0 0 .6-.287c.467-.273.838-.64 1.188-1.002l.018-.018c.26-.27.512-.53.782-.75a2.76 2.76 0 0 1 .485-.333c.018.41-.173.714-.365 1.018-.194.308-.389.616-.364 1.036.832.78 1.46.101 2.06-.547.318-.344.629-.68.957-.782.303-.095.655-.04.992.01.615.095 1.177.181 1.288-.668-.38-.532-1.04-.705-1.684-.875l-.072-.02a7.045 7.045 0 0 0-.366-.082c-.559-.115-1.18-.244-1.323-.833.3-.266.583-.166.872-.064.217.077.439.155.675.08.179-.055.348-.251.514-.443l.097-.11a61.747 61.747 0 0 0-7.453-.333l-.448.01-.08.002c-.264.603-1.2 1.373-1.753 1.246-.1-.331.085-.517.266-.698.147-.147.29-.29.275-.506-.705.032-1.411.074-2.117.13a2.365 2.365 0 0 0-.427.55c-.097.186-.108.403-.119.618-.013.257-.025.513-.184.716-.333.43-.88.564-1.414.696-.2.05-.397.098-.582.162-.113.038-.221.076-.326.113-1.13.394-1.845.643-2.859.468l-.056-.01c-.34-.055-.927-.15-1.019-.591.434-.157.893-.211 1.362-.267.65-.077 1.321-.157 1.98-.512.23-.125.34-.32.453-.522.088-.157.179-.318.33-.457.142-.13.314-.208.474-.28.259-.117.487-.22.502-.507a61.87 61.87 0 0 0-13.507 3.056c-.02.293-.087.583-.15.855a7.522 7.522 0 0 0-.096.456 2.382 2.382 0 0 0-.023.502c.007.197.012.344-.099.483-.49.62-1.549.559-2.578.5-.54-.031-1.073-.061-1.51.007-.351.055-.64.192-.917.345Z'
          }
          fill={`url(#love-planet-area_svg__b${id})`}
        />
      </g>
      <defs>
        <linearGradient
          id={`love-planet-area_svg__b${id}`}
          x1={-14.934}
          y1={0.212}
          x2={122.703}
          y2={138.735}
          gradientUnits={'userSpaceOnUse'}
        >
          <stop stop-color={'#fff'} />
          <stop offset={1} stop-color={'#fff'} stop-opacity={0} />
        </linearGradient>
        <clipPath id={`love-planet-area_svg__a${id}`}>
          <path fill={'#fff'} d={'M0 0h132v80H0z'} />
        </clipPath>
      </defs>
    </svg>
  )
}
