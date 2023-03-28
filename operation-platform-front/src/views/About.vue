<template>
  <div class="about">
    <player :song-list="songList"></player>
  </div>
</template>
<script>
import Player from '@/components/player/player'

export default {
  components: {Player},
  data() {
    return {
      songList: [
        {
          id: 1,
          name: '加油!',
          time: '',
          artist: '加油',
          album: '?',
          cover: '',
          url: require('@/static/林俊杰 MC Hotdog - 加油！.flac')
        },
        {
          id: 2,
          name: '交换余生!',
          time: '',
          artist: '加油',
          album: '?',
          cover: '',
          url: require('@/static/交换余生 - 林俊杰.flac')
        },
        {
          id: 3,
          name: '等你下课!',
          time: '',
          artist: '加油',
          album: '?',
          cover: '',
          url: require('@/static/等你下课(with 杨瑞代) - 周杰伦.flac')
        },
        {
          id: 4,
          name: '骄傲的少年!',
          time: '',
          artist: '加油',
          album: '?',
          cover: '',
          url: require('@/static/骄傲的少年-《那年那兔那些事儿 第二季》动画片尾曲 - 南征北战NZBZ.mp3')
        }
      ]
    }
  }
}
</script>
