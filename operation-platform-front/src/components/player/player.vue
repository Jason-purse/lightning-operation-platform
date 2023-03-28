<template>
    <div id="music-container" class="audio-player">
      <div class="ap-status">
<!--          <div class="ap-playlist">-->
<!--            <div class="ap-playlist-header">-->
<!--              <div class="ap-playlist-header-name">-->
<!--                <span class="ap-playlist-header-title">播放列表</span>-->
<!--                <span class="ap-playlist-header-amount">(共首歌)</span>-->
<!--              </div>-->
<!--              <div class="ap-playlist-header-artist">歌手</div>-->
<!--              <div class="ap-playlist-header-close">×</div>-->
<!--            </div>-->
<!--            <div class="ap-playlist-body ps">-->
<!--              <ol>-->
<!--                <li class="ap-playlist-line">-->
<!--                    <div class="ap-playlist-line-name">name</div>-->
<!--                    <div class="ap-playlist-line-artist">artist</div>-->
<!--                </li>-->
<!--              </ol>-->
<!--            </div>-->
<!--          </div>-->
<!--        控制器综合部分 控制音量,进度-->
        <div class="ap-controller">
          <div class="ap-controller-left">
<!--            封面-->
            <div class="ap-cover"></div>
            <div class="ap-button ap-skipback-button" @click="_skipBack">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M20.229 24.343l-10.286-6.171c-0.914-0.571-1.486-1.371-1.486-2.171s0.571-1.714 1.486-2.171l10.286-6.171c0.914-0.571 1.829-0.686 2.629-0.229 0.686 0.457 1.143 1.257 1.143 2.286v12.571c0 1.029-0.457 1.943-1.143 2.286-0.343 0.229-0.686 0.229-1.029 0.229-0.457 0.114-1.029-0.114-1.6-0.457zM21.143 9.143l-10.286 6.171c-0.343 0.229-0.571 0.457-0.571 0.686s0.229 0.571 0.571 0.686l10.286 6.171c0.457 0.229 0.686 0.229 0.914 0.229 0.229-0.114 0.229-0.457 0.229-0.8v-12.571c0-0.457-0.114-0.686-0.229-0.8 0 0-0.114 0-0.229 0-0.229-0.114-0.457 0-0.686 0.229z"></path><path d="M8.229 7.771v16.571c0 0.457 0.343 0.914 0.914 0.914v0c0.457 0 0.914-0.343 0.914-0.914v-16.571c0-0.457-0.343-0.914-0.914-0.914v0c-0.457 0-0.914 0.343-0.914 0.914z"></path>
              </svg>
            </div>
            <div class="ap-button ap-play-button" @click="_play">
              <svg v-if="!player.playing  " version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M22.756 16.711l-8.8 5.422c-0.444 0.267-0.978 0.089-1.244-0.267-0.089-0.178-0.089-0.267-0.089-0.444v-10.844c0-0.533 0.356-0.889 0.889-0.889 0.178 0 0.356 0.089 0.444 0.089l8.8 5.422c0.444 0.267 0.533 0.8 0.267 1.244-0.089 0.089-0.178 0.178-0.267 0.267z"></path>
              </svg>
              <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M11.556 8.889v0c0.711 0 1.333 0.622 1.333 1.333v11.556c0 0.711-0.622 1.333-1.333 1.333v0c-0.711 0-1.333-0.622-1.333-1.333v-11.556c0-0.711 0.622-1.333 1.333-1.333z"></path><path d="M21.333 8.889v0c0.711 0 1.333 0.622 1.333 1.333v11.556c0 0.711-0.622 1.333-1.333 1.333v0c-0.711 0-1.333-0.622-1.333-1.333v-11.556c0-0.711 0.622-1.333 1.333-1.333z"></path>
              </svg>
            </div>
            <div class="ap-button ap-skipforward-button" @click="_skipForward">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M10.514 24.914c-0.343 0-0.686-0.114-1.029-0.229-0.686-0.457-1.143-1.257-1.143-2.286v-12.571c0-1.029 0.457-1.943 1.143-2.286 0.686-0.457 1.714-0.343 2.629 0.229l10.286 6.171c0.914 0.571 1.486 1.371 1.486 2.171s-0.571 1.714-1.486 2.171l-10.286 6.171c-0.571 0.229-1.143 0.457-1.6 0.457zM10.514 8.8c-0.114 0-0.114 0-0.229 0-0.229 0.114-0.229 0.457-0.229 0.8v12.571c0 0.457 0.114 0.686 0.229 0.8s0.457 0.114 0.914-0.229l10.286-6.171c0.343-0.229 0.571-0.457 0.571-0.686s-0.229-0.457-0.571-0.686l-10.286-6.171c-0.343-0.114-0.571-0.229-0.686-0.229z"></path><path d="M23.086 6.857v0c-0.457 0-0.914 0.343-0.914 0.914v16.571c0 0.457 0.343 0.914 0.914 0.914v0c0.457 0 0.914-0.343 0.914-0.914v-16.571c0-0.571-0.343-0.914-0.914-0.914z"></path>
              </svg>
            </div>
            <div class="ap-line">
              <div class="ap-line-draw"></div>
            </div>
          </div>
          <div class="ap-controller-center">
<!--            歌曲信息-->
            <div class="ap-song-msg">
              <span class="ap-name">{{player.song.name || 'unknown'}}</span>
              <span class="ap-artist">-{{player.song.artist || 'UNKNOWN'}}</span>
              <span class="ap-time">
                <span class="ap-current-time">{{player.currentTime || '00:00'}}</span>
                <span>&nbsp;/&nbsp;</span>
                <span class="ap-total-time">{{player.totalTime || '00:00'}}</span>
              </span>
            </div>
            <div class="ap-progress-line">
              <div class="ap-play-track" ref="track">
                  <div class="ap-play-bar-wrap">
                      <div class="ap-buffer-bar" :style="{transform: 'scaleX('+player.bufferedScaleX+')'}"></div>
                      <div class="ap-progress-bar" :class="{'forbid-transition': player.thumbSlide}" :style="{transform: 'scaleX('+player.progressScaleX+')'}"></div>
                  </div>
                  <div class="ap-progress-thumb" ref="thumb" :class="['ap-svg-exclude',{'forbid-transition': player.thumbSlide}]"  :style="{transform: 'translateX('+player.thumbTranslateX+'px)'}">
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 32">
                    <path fill="#32b0da" opacity="0.28" d="M11.789 1.207h11.789c3.72 0 6.737 3.016 6.737 6.737v8.421c0 3.72-3.016 6.737-6.737 6.737h-11.789c-3.72 0-6.737-3.016-6.737-6.737v-8.421c0-3.72 3.016-6.737 6.737-6.737z"></path>

                    <path fill="#32b0da" opacity="0.14" d="M12.211 2.050h10.947c3.488 0 6.316 2.828 6.316 6.316v7.579c0 3.488-2.828 6.316-6.316 6.316h-10.947c-3.488 0-6.316-2.828-6.316-6.316v-7.579c0-3.488 2.828-6.316 6.316-6.316z"></path>

                    <path fill="#000" d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"></path>

                    <path fill="#fff" d="M22.737 2.969c3.256 0 5.895 2.627 5.895 5.866v6.705c0 3.24-2.639 5.866-5.895 5.866h-10.105c-3.256 0-5.895-2.626-5.895-5.866v-6.705c0-3.239 2.639-5.866 5.895-5.866h10.105z"></path>

                    <path fill="#333" d="M13.053 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"></path>

                    <path fill="#333" d="M22.316 9.706c0.697 0 1.263 0.566 1.263 1.263v2.526c0 0.697-0.566 1.263-1.263 1.263s-1.263-0.566-1.263-1.263v-2.526c0-0.697 0.566-1.263 1.263-1.263z"></path>

                    <path fill="#333" d="M26.947 15.538c0 2.321-1.89 4.211-4.211 4.211h-10.105c-2.321 0-4.211-1.89-4.211-4.211v-6.737c0-2.323 1.89-4.211 4.211-4.211h10.105c2.321 0 4.211 1.888 4.211 4.211v6.737zM23.020 2.935l0.6-1.041c0.349-0.603 0.143-1.376-0.461-1.725s-1.376-0.141-1.725 0.461l-1.314 2.275h-4.871l-1.314-2.275c-0.349-0.603-1.122-0.81-1.725-0.461-0.605 0.349-0.812 1.122-0.463 1.725l0.601 1.041c-3.121 0.15-5.612 2.708-5.612 5.866v6.737c0 3.256 2.639 5.895 5.895 5.895h10.105c3.256 0 5.895-2.639 5.895-5.895v-6.737c0-3.16-2.491-5.716-5.612-5.866z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="ap-controller-right">
            <div class="ap-line">
              <div class="ap-line-draw"></div>
            </div>
            <div class="ap-button ap-volume-button">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M16.571 27.429c-0.457 0-0.8-0.114-1.143-0.457l-5.943-5.257h-2.743c-1.257 0-2.286-1.029-2.286-2.286v-5.829c0-1.257 1.029-2.286 2.286-2.286h2.743l5.943-5.257c0.686-0.571 1.829-0.571 2.4 0.114 0.229 0.343 0.457 0.686 0.457 1.143v18.286c0 1.029-0.8 1.829-1.714 1.829zM6.857 13.143c-0.343 0-0.571 0.229-0.571 0.571v5.829c0 0.343 0.229 0.571 0.571 0.571h3.429l6.4 5.714v-18.171l-6.4 5.6h-3.429z"></path><path d="M22.154 21.797c1.714-1.45 2.703-3.532 2.703-5.797 0-2.247-0.864-4.207-2.449-5.66-0.349-0.32-0.891-0.296-1.211 0.053s-0.296 0.891 0.053 1.211c1.232 1.129 1.893 2.631 1.893 4.397 0 1.755-0.763 3.361-2.097 4.489-0.361 0.306-0.406 0.847-0.101 1.208s0.847 0.406 1.208 0.101z"></path><path d="M25.355 24.539c2.517-2.139 3.959-5.253 3.959-8.653 0-3.22-1.389-6.329-3.697-8.509-0.344-0.325-0.887-0.31-1.212 0.035s-0.31 0.887 0.035 1.212c1.971 1.861 3.16 4.523 3.16 7.263 0 2.896-1.221 5.533-3.355 7.347-0.361 0.307-0.405 0.848-0.098 1.208s0.848 0.405 1.208 0.098z"></path></svg>
            </div>
            <div class="ap-volume-line">
              <div class="ap-volume-track" ref="trackV">
                <div class="ap-volume-bar-wrap">
                  <div class="ap-volume-bar" :class="{'forbid-transition': player.thumbVSlide}" :style="{transform: 'scaleX('+player.volume+')'}"></div>
                </div>
                <div class="ap-volume-thumb" ref="thumbV" :class="{'forbid-transition': player.thumbVSlide}" :style="{transform: 'translateX('+player.volumeX+'px)'}">
                  <div class="ap-volume-thumb-dot"></div>
                </div>
              </div>
            </div>
            <div class="ap-button ap-order-button">
              <!-- 列表循环 -->
              <svg v-if="player.playType === 1" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M25.6 15.657c-0.343 0-0.686 0.343-0.686 0.686 0 0.114 0 0.229 0 0.229v1.829c0 2.4-1.829 4.229-4.229 4.229h-10.286l0.914-0.8c0.114-0.114 0.229-0.343 0.229-0.457 0-0.343-0.343-0.686-0.686-0.686-0.229 0-0.457 0.114-0.571 0.229l-2.057 1.829-0.8 0.686 2.857 2.514c0.114 0.229 0.343 0.343 0.571 0.343 0.457 0 0.8-0.229 0.8-0.686 0-0.229-0.114-0.457-0.343-0.571l-1.029-0.914v-0.114h10.4c3.086 0 5.6-2.514 5.6-5.6v-1.829c0-0.114 0-0.114 0-0.229 0-0.343-0.343-0.686-0.686-0.686zM8.229 16.571v-1.829c0-2.4 1.829-4.229 4.229-4.229h10.971l-0.914 0.914c-0.229 0.114-0.343 0.343-0.343 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l1.486-1.371 1.257-1.257-2.743-2.629c-0.229-0.114-0.457-0.229-0.686-0.229-0.457 0-0.686 0.343-0.686 0.8 0 0.229 0.114 0.343 0.229 0.571l0.914 0.8v0.114h-10.971c-2.971 0-5.486 2.514-5.486 5.6v1.829c0 0.114 0 0.114 0 0.229 0 0.343 0.343 0.686 0.686 0.686s0.686-0.343 0.686-0.686c0-0.114 0-0.229 0-0.229z"></path></svg>
              <!-- 随机播放 -->
              <svg v-else-if="player.playType === 2" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M17.6 15.543c0.229 0 0.457-0.114 0.571-0.229l2.629-2.4c0.914-0.8 2.171-1.257 3.429-1.486l-1.029 0.914c-0.229 0.114-0.343 0.343-0.343 0.457 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.686-0.229l3.086-2.4-3.086-2.514c-0.114-0.229-0.343-0.343-0.571-0.343-0.457 0-0.914 0.229-0.914 0.686 0 0.229 0.114 0.457 0.343 0.571v0l1.029 0.8c-1.714 0.114-3.314 0.8-4.457 1.829l-2.629 2.4c-0.114 0.114-0.229 0.343-0.229 0.457 0 0.229 0.114 0.343 0.229 0.457 0.114 0.343 0.343 0.343 0.457 0.343zM14.057 17.486c-0.229 0-0.457 0.114-0.571 0.229l-2.743 2.514c-1.143 0.914-2.629 1.371-4.114 1.371 0 0 0 0 0 0-0.457 0-0.8 0.343-0.8 0.686s0.343 0.686 0.8 0.686c0 0 0 0 0 0 1.943 0 3.771-0.571 5.257-1.829l2.857-2.514c0.114-0.114 0.229-0.343 0.229-0.457 0-0.229-0.114-0.343-0.229-0.457-0.229-0.114-0.457-0.229-0.686-0.229zM23.771 19.543c-0.457 0-0.8 0.343-0.8 0.686 0 0.229 0.114 0.343 0.343 0.457l1.029 0.8c-1.029-0.114-2.057-0.457-2.857-1.029l-9.029-8.229c-1.486-1.371-3.543-2.171-5.714-2.171-0.571 0-1.029 0.343-1.029 0.686s0.457 0.686 0.914 0.686c1.714 0 3.429 0.686 4.571 1.714l9.029 8.229 0.229 0.114c1.143 0.8 2.514 1.257 4 1.486l-1.143 0.914c-0.343 0.114-0.457 0.343-0.457 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l3.086-2.514-3.086-2.629c0-0.114-0.229-0.114-0.457-0.114z"></path></svg>
              <!-- 单曲循环 -->
              <svg v-else version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M25.6 15.657c-0.343 0-0.686 0.343-0.686 0.686 0 0.114 0 0.229 0 0.229v1.829c0 2.4-1.829 4.229-4.229 4.229h-10.286l0.914-0.8c0.114-0.114 0.229-0.343 0.229-0.457 0-0.343-0.343-0.686-0.686-0.686-0.229 0-0.457 0.114-0.571 0.229l-2.057 1.829-0.8 0.686 2.857 2.514c0.114 0.229 0.343 0.343 0.571 0.343 0.457 0 0.8-0.229 0.8-0.686 0-0.229-0.114-0.457-0.343-0.571l-1.029-0.914v-0.114h10.4c3.086 0 5.6-2.514 5.6-5.6v-1.829c0-0.114 0-0.114 0-0.229 0-0.343-0.343-0.686-0.686-0.686zM8.229 16.571v-1.829c0-2.4 1.829-4.229 4.229-4.229h10.971l-0.914 0.914c-0.229 0.114-0.343 0.343-0.343 0.571 0 0.343 0.343 0.686 0.8 0.686 0.229 0 0.457-0.114 0.571-0.343l1.486-1.371 1.257-1.257-2.743-2.629c-0.229-0.114-0.457-0.229-0.686-0.229-0.457 0-0.686 0.343-0.686 0.8 0 0.229 0.114 0.343 0.229 0.571l0.914 0.8v0.114h-10.971c-2.971 0-5.486 2.514-5.486 5.6v1.829c0 0.114 0 0.114 0 0.229 0 0.343 0.343 0.686 0.686 0.686s0.686-0.343 0.686-0.686c0-0.114 0-0.229 0-0.229z"></path><path d="M18.286 20v-6.857h-1.257l-2.171 1.714 0.457 1.257 1.486-0.914v4.8z"></path></svg>
            </div>
            <div class="ap-button ap-playlist-button">
              <div class="ap-playlist-button-bg">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path d="M5.371 6.857h9.943c0.457 0 0.8 0.343 0.8 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-9.943c-0.457 0-0.8-0.343-0.8-0.8v0c0-0.457 0.343-0.8 0.8-0.8z"></path><path d="M5.371 11.086h7.429c0.457 0 0.914 0.343 0.914 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-7.543c-0.457 0-0.8-0.343-0.8-0.8v0c0-0.457 0.343-0.8 0.8-0.8z"></path><path d="M5.371 15.2h5.829c0.457 0 0.8 0.343 0.8 0.8v0c0 0.457-0.343 0.8-0.8 0.8h-5.829c-0.457 0.114-0.8-0.343-0.8-0.8v0c0-0.343 0.343-0.8 0.8-0.8z"></path><path d="M20.571 6.857v0c0.457 0 0.8 0.343 0.8 0.8v14.057c0 0.457-0.343 0.8-0.8 0.8v0c-0.457 0-0.8-0.343-0.8-0.8v-14.057c0-0.457 0.457-0.8 0.8-0.8z"></path><path d="M20.914 8.457c0 0 0.114 0 0.229 0.114 0.229 0.114 0.571 0.229 0.914 0.343 0.914 0.457 1.943 1.257 2.743 2.286 0.343 0.343 0.686 0.8 0.914 1.257 0.229 0.343 0.8 0.457 1.143 0.229s0.457-0.8 0.229-1.143c-0.343-0.571-0.686-1.029-1.029-1.486-0.914-1.143-2.057-2.057-3.2-2.514-0.686-0.343-1.257-0.571-1.6-0.571-0.457-0.114-0.914 0.229-0.914 0.686-0.114 0.343 0.114 0.8 0.571 0.8z"></path><path d="M17.371 24.686c1.371 0 2.4-1.143 2.4-2.4s-1.143-2.4-2.4-2.4-2.514 1.029-2.514 2.4 1.143 2.4 2.514 2.4zM17.371 26.286c-2.286 0-4.114-1.829-4.114-4s1.829-4 4.114-4 4.114 1.829 4.114 4-1.829 4-4.114 4z"></path></svg>
                <span class="ap-playlist-button-amount">{{songList.length || 0}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="ap-toast">{{player.error || ''}}</div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'player',
  data () {
    return {
      player: {
        playStatus: 0,
        currentPlayIndex: 0,
        playType: '', // 播放类型
        playing: false, // 是否正在播放
        volume: 0.25, // 音量初始值
        volumeX: 25, // 音量滑块位置
        error: '', // 错误信息
        currentTime: '00:00', // 当前播放时间
        totalTime: '00:00', // 总播放时间
        bufferedScaleX: 0, // 缓存进度
        progressScaleX: 0, // 播放进度
        thumbTranslateX: 0, // 进度条滑块位置
        thumbSlide: false, // 进度条滑块滑动时标记
        thumbVSlide: false, // 音量滑块滑动时标记
        song: { // 当前播放的音乐
          // 当前播放歌曲信息
          cover: '', // 音乐icon
          name: '', // 歌名
          artist: '', // 歌手
          album: '', // 专辑
          time: '', // 时间
          url: '' // 歌曲链接
        },
        // 滑块拉动时平滑播放(并不计算进度条)
        thumbSlideMark: false
      },
      audioPlayer: null // 播放器dom元素,
    }
  },
  props: {
    songList: {
      type: Array,
      required: false,
      default: () => []
    }
  },
  created () {
    this._createPlayer() // 创建组件的同时创建播放器
  },
  mounted () {
    this._initPlayer()
    // 初始化进度条与音量的鼠标滑动事件
    this.slideProgress()
    this.slideVolume()
    // 尝试着加载一个资源
    this.player.song = this.songList[0]
    this.audioPlayer.src = this.player.song.url
    console.log(this.audioPlayer.src)
  },
  destroyed () {
    // 官方说明,只能当暂停才有可能进入垃圾回收,同时将它丢弃
    this.audioPlayer.pause()
    this.audioPlayer = null // 丢弃
  },
  methods: {
    _createPlayer () {
      // 生成一个播放器元素
      this.audioPlayer = new Audio()
      this.audioPlayer.autoplay = true
    },
    // 暂停与播放
    _play () {
      if (this.player.playing) { // 播放中,点击则为暂停
        this.player.playing = false
        this.audioPlayer.pause()
      } else { // 暂停中,点击则为播放
        this.player.playing = true
        this.audioPlayer.play()
      }
    },
    _initPlayer () {
      const progressL = this.$refs.track.offsetWidth // 进度条总长

      // 音频或视频文件已经就绪可以开始，在点击播放时触发  并不需要做什么
      this.audioPlayer.addEventListener('play', () => {
        // 由于开启了自动播放,所以自动设置
        this.player.playing = true
      })

      // 浏览器开始寻找指定的音频或视频
      this.audioPlayer.addEventListener('loadstart', () => {
        console.log('loadstart')
        // 当前音量进度(给播放器设置)
        this.audioPlayer.volume = this.player.volume
        // this.player.volumeX = this.audioPlayer.volume * this.$refs.trackV.offsetWidth
      })

      // 跳跃进度也并不需要做什么
      this.audioPlayer.addEventListener('seeking', (event) => {
        console.log('跳跃中')
      })
      this.audioPlayer.addEventListener('seeked', (event) => {
        console.log('跳跃结束')
      })
      // 当进行缓存的时候,改变缓存进度条(并不是实时的,可以接受)
      this.audioPlayer.addEventListener('progress', (event) => {
        console.log('progress')
        // 当前缓存进度
        // 已缓存时间(如果没有缓存默认为0)
        const buffered = this.audioPlayer.buffered.length ? this.audioPlayer.buffered.end(this.audioPlayer.buffered.length - 1) : 0
        // 缓存进度偏移量
        this.player.bufferedScaleX = (buffered / this.audioPlayer.duration).toFixed(3)
      })

      // 播放位置改变时触发[注意:播放和调整指示定位时都会触发,并且暂停也会触发]（主要事件）
      this.audioPlayer.addEventListener('timeupdate', () => {
        // 由于初始创建或者摧毁时 audioplayer = null,事件更新,导致当前事件报空
        if (this.audioPlayer && !this.player.thumbSlideMark) {
          // 当前播放时间
          this.player.currentTime = this.timeToString(this.audioPlayer.currentTime)
          // 总播放时间
          this.player.totalTime = this.timeToString(this.audioPlayer.duration)
          // 当前播放进度百分比
          const precent = this.audioPlayer.currentTime / this.audioPlayer.duration || 0
          // 当前播放进度(4舍5入,并保留几位,最大100%)
          this.player.progressScaleX = precent.toFixed(3)
          // 当前进度按钮位置
          // 需要做一个判断
          const distance = (precent * progressL).toFixed(3)
          if (distance - 100 >= 0.001) {
            this.player.thumbTranslateX = distance - this.$refs.thumb.offsetWidth / 5
          } else {
            this.player.thumbTranslateX = distance
          }
        }
        // 否则其他情况,也许并没有其他情况,不做任何事情
      })

      // 音频能够没有干扰的播放结束(这时候意味着音频差不多被加载完了)
      this.audioPlayer.addEventListener('canplaythrough', () => {
        console.log('canplaythrough')
      })

      // 音频或视频的时长已改变
      this.audioPlayer.addEventListener('durationchange', () => {
        this.player.totalTime = this.timeToString(this.audioPlayer.duration)
      })

      // 在音频或视频终止加载时触发，包括终止当前播放（未加载完）进行下一首播放时也会触发
      this.audioPlayer.addEventListener('abort', () => {
        console.log('abort')
      })

      // 在音频或视频加载发生错误时触发
      this.audioPlayer.addEventListener('error', () => {
        console.log('error')
        switch (this.audioPlayer.networkState) {
          case '0':
            this.error = '尚未初始化'
            break
          case '1':
            this.error = '正在加载资源'
            break
          case '3':
            this.error = '未找到资源'
            break
        }
        this.audioPlayer.readyState === '0' && (this.error = '音频地址错误')

        // 3秒之后重置错误消息
        setTimeout(() => {
          this.error = ''
        }, 3000)
      })

      // 播放结束
      this.audioPlayer.addEventListener('ended', () => {
        this.player.thumbSlide = true
        switch (this.playType) {
          case 1: // 列表循环
            this.player.currentPlayIndex = this.player.currentPlayIndex + 1 >= this.songList.length ? 0 : this.player.currentPlayIndex + 1
            break
          case 2: // 随机播放
            this.player.currentPlayIndex = Math.floor(Math.random() * this.songList.length)
            break
          case 3: // 单曲循环
            this.audioPlayer.loop = true
            break
        }
        // 如果没有循环播放,那么手动播放
        if (!this.audioPlayer.loop) {
          this.player.song = this.songList[this.player.currentPlayIndex]
          // 触发
          setTimeout(() => {
            this.audioPlayer.play()
          }, 10)
        }
        // 解决因为transition的回弹bug
        setTimeout(() => {
          this.player.thumbSlide = false
        }, 100)
      }, true)
    },

    // 滑动进度条
    slideProgress () {
      // 由于滑动事件有相同代码，所以进行了简单的封装，具体原理在注释代码中。
      this.slideFn('progress', this.$refs.thumb, this.$refs.track.offsetWidth)
    },
    // 滑动音量
    slideVolume () {
      // 由于滑动事件有相同代码，所以进行了简单的封装，具体原理在注释代码中。
      this.slideFn('volume', this.$refs.thumbV, this.$refs.trackV.offsetWidth)
    },
    // 上一首
    _skipBack () {
      this._skipFn('skipBack')
    },

    // 下一首
    _skipForward () {
      this._skipFn('skipForward')
    },
    // 上下首封装
    _skipFn (type) {
      switch (this.playType) {
        case 2: // 随机播放
          this.player.currentPlayIndex = Math.floor(Math.random() * this.songList.length)
          break
        default:
          if (type === 'skipBack') {
            // eslint-disable-next-line no-unused-expressions
            (this.player.currentPlayIndex - 1) >= 0 ? this.player.currentPlayIndex-- : 0
          } else {
            this.player.currentPlayIndex = this.player.currentPlayIndex + 1 >= this.songList.length ? this.songList.length - 1 : this.player.currentPlayIndex + 1
          }
          break
      }

      this.player.song = this.songList[this.player.currentPlayIndex]
      this.audioPlayer.src = this.player.song.url
      this.player.playing = true
      setTimeout(() => {
        this.player.totalTime = '00:00'
        this.audioPlayer.play()
      }, 10)
    },
    // 滑动封装
    slideFn (type, thumbDom, progressLength) {
      const thumb = thumbDom
      const _this = this
      thumb.onmousedown = function (e) {
        // 移动时暂停播放并设置transition: none，解决在滑动结束后出现回弹的bug
        if (type === 'progress') {
          // 不暂停播放
          // _this.audioPlayer.pause()
          // 开启滑动标志
          _this.player.thumbSlideMark = true
          _this.player.thumbSlide = true
        } else {
          _this.player.thumbVSlide = true
        }

        const progressL = progressLength
        // 获取当前thumb的视口x
        const mouseInitX = e.clientX
        let mouseEndX = 0
        let moveX = 0
        // 转换为数值
        const thumbInitX = _this.stringToNum(thumb.style.transform)
        let thumbEndX = 0

        // 当用户在文档范围内进行鼠标移动
        document.onmousemove = function (e) {
          // 始终记录最后的鼠标位置
          mouseEndX = e.clientX
          // 算出需要移动多少的距离
          moveX = mouseEndX - mouseInitX

          const a = (thumbInitX + 0) + moveX
          // 如果移动大于零,向右
          if (moveX > 0) {
            // 判断 这个距离是否大于进度条本身,如果是就是进度条的长度 减去 thumb本身的宽度,否则是a的长度(位置) 由于有细小位差
            // 无法直接将进度全部拉完,也是为了美观
            if (type === 'progress') {
              thumbEndX = a + thumb.offsetWidth >= progressL ? progressL - 2 - (thumb.offsetWidth / 2).toFixed(0) : a
            } else {
              thumbEndX = a > progressL ? progressL : a
            }
          } else {
            // 同样的,范围判断
            thumbEndX = a <= 0 ? 0 : a
          }

          // 判断是否是进度条事件
          if (type === 'progress') {
            // 算出进度条播放位置
            _this.player.progressScaleX = thumbEndX / progressL
            // 同样,缩略图的位置同步
            _this.player.thumbTranslateX = thumbEndX
          } else {
            // 计算音量
            _this.player.volume = thumbEndX / progressL
            // 音量缩略图
            _this.player.volumeX = thumbEndX
            // 否则设置音量(意味着事件可能就是设置音量)
            _this.audioPlayer.volume = thumbEndX / progressL
          }
        }

        document.onmouseup = function (e) {
          if (type === 'progress') {
            // 反过来设置播放器播放的位置
            _this.audioPlayer.currentTime = thumbEndX * (_this.audioPlayer.duration ? _this.audioPlayer.duration / progressL : 0)
            _this.player.playing && _this.audioPlayer.play()
            _this.player.thumbSlide = false
            _this.player.thumbSlideMark = false
          } else {
            _this.player.thumbVSlide = false
          }
          // 最终移除鼠标按下事件,移动事件,弹起事件
          document.onmousedown = null
          document.onmousemove = null
          document.onmouseup = null
        }
      }
    },
    // 字符串转数字
    stringToNum (str) {
      return Number(str.replace(/translateX\(|px\)/g, ''))
    },
    // 秒值转字符串
    timeToString (param) {
      param = parseInt(param)
      let mm = ''
      let ss = ''
      if (param >= 0 && param < 60) {
        param < 10 ? ss = '0' + param : ss = param
        return '00:' + ss
      } else if (param >= 60 && param < 3600) {
        mm = parseInt(param / 60)
        // eslint-disable-next-line no-unused-expressions
        mm < 10 ? mm = '0' + mm : mm
        // eslint-disable-next-line func-call-spacing
        const someMinute = mm * 60;
        // eslint-disable-next-line no-use-before-define,no-unexpected-multiline
        (param - parseInt(someMinute)) < 10 ? ss = '0' + String(param - parseInt(someMinute)) : ss = param - parseInt(mm * 60)
        return mm + ':' + ss
      }
    }
  }
}
</script>

<style scoped lang="stylus">
  .forbid-transition
    transition none !important
  svg:not(:root)
    overflow hidden
  .audio-player
    position fixed
    bottom 0
    left 0
    width 100%
    height 80px
    white-space nowrap
    background-position 0 0
    background-image linear-gradient(120deg, rgba(255, 159, 243, 0.81), rgba(254, 202, 87, 0.8), rgba(255, 107, 107, 0.81), rgba(72, 219, 251, 0.8), rgba(29, 209, 161, 0.8), rgba(162, 155, 254, 0.8), rgba(129, 236, 236, 0.81), rgba(85, 239, 196, 0.81), rgba(255, 118, 117, 0.8),#ff9ff3,#feca57,#ff6b6b,#48dbfb,#1dd1a1,#a29bfe,#81ecec,#55efc4,#ff7675,rgba(255, 118, 117, 0.8),rgba(255, 159, 243, 0.81),rgba(254, 202, 87, 0.8),rgba(255, 107, 107, 0.81),rgba(72, 219, 251, 0.8),rgba(29, 209, 161, 0.8),  rgba(162, 155, 254, 0.8),rgba(129, 236, 236, 0.81),rgba(85, 239, 196, 0.81))
    background-size 400%
    animation player-bg-rotate 26s infinite  alternate forwards linear
    .ap-line
      font-size 24px
      padding 0 8px
      cursor: default
      .ap-line-draw
        height 24px
        width 1px
        background-color white
    svg:not(.ap-svg-exclude)
      width 28px
      height 28px
      vertical-align middle
      transition .2s
    .ap-button
      cursor  pointer
      transition .2s
    .ap-status
      position relative
      margin 0 auto
      width 1200px
      height 100%
      .ap-controller
        display flex
        width 100%
        height 100%
        background-color transparent
        position relative
        .ap-controller-left>* , .ap-controller-right>*
          display inline-flex
          align-items center
          justify-content center
          height 100%
          vertical-align  middle
        .ap-controller-left
          .ap-cover
            width 80px
            height 80px
            background-color #e7e7e7
            background-size 100%
            cursor pointer
          .ap-button
            padding 0 8px
          .ap-skipback-button
            margin-left 16px
          .ap-skipforward-button
            margin-right 16px
      .ap-controller-center
        padding 10px 0  15px 20px
        display  flex
        flex-grow 1
        flex-direction column
        overflow hidden
        .ap-buffer-bar,.ap-progress-bar
          position absolute
          -webkit-transform-origin 0 0
          transform-origin 0 0
          top 0
          bottom 0
          left 0
          right 0
          transition transform .5s linear
        .ap-song-msg
          display flex
          flex-grow 1
          align-items center
          .ap-name
            cursor: pointer
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          .ap-artist
            font-size 12px
            margin-left 6px
            cursor: default;
            white-space nowrap
            text-overflow ellipsis
          .ap-time
            font-size 12px
            flex-grow 1
            text-align right
            cursor default
            min-width 110px
          .ap-song-msg,.ap-time,.ap-current-time
            color #fff
        .ap-progress-line
          flex-grow 1
          display flex
          align-items center
          .ap-play-track
            position relative
            width 100%
            height 3px
            border-radius 1.5px
            .ap-play-bar-wrap
              position absolute
              top 0
              left 0
              bottom 0
              right 0
              border-radius 1.5px
              overflow hidden
              background-color white
              .ap-buffer-bar
                background-color #34e7e4
              .ap-progress-bar
                background-color #0fbcf9
            .ap-progress-thumb
              transition transform .5s linear
              position absolute
              top -5px
              left -4px
              svg
                width 21px
                height 19px
                display block
                cursor: pointer;
      .ap-controller-right
        width 360px
        padding 0 20px
        .ap-button
          padding 0 8px
        .ap-volume-line
          width 86px
          margin-right 8px
          height 28px
          &:hover
            .ap-volume-thumb-dot
              transform scale(1.2)
        .ap-volume-track
          position relative
          width 100%
          height 3px
        .ap-volume-bar-wrap
          position absolute
          top 0
          bottom 0
          left 0
          right 0
          border-radius 1.5px
          background-color white
          overflow hidden
            background-color white
          .ap-volume-bar
            position absolute
            transform-origin 0 0
            top 0
            left 0
            bottom 0
            right 0
            transform scale(0)
            background-color #ff4757
        .ap-volume-thumb
          position absolute
          top -4px
          left -6px
          cursor: pointer;
          .ap-volume-thumb-dot
            width 12px
            height 12px
            border-radius 50%
            transform-origin center center
            background-color #ff4757
            transition .2s
        .ap-playlist-button-bg
          background-color white
          height 28px
          border-radius 14px
          padding 0 8px 0 6px
        .ap-playlist-button-amount
          font-size 12px
          vertical-align middle
          transition .2s

  @keyframes player-bg-rotate
    from
      background-position 0 0
    to
      background-position right 0
</style>
