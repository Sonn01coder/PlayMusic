const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
    const cd = $('.cd') 
    const heading = $('header h2')
    const cdThumb = $('.cd-thumb')
    const audio = $('#audio')
    const playBtn = $('.btn-toggle-play')
    const player = $('.player')
    const progress = $('#progress')
    const nextBtn = $('.btn-next')
    const prevBtn = $('.btn-prev')
    const randomBtn = $('.btn-random')
    const repeatBtn = $('.btn-repeat')
    const playlist = $('.playlist')
    
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Internet Love",
            singer: "hnhngan, Obito",
            path: './music/INTERNET.mp3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGvquPaicHunos2IOwTo-b_xUR8ohGhtQPUg&usqp=CAU'

        },
        {
            name: "Tình đắng như ly cafe",
            singer: "nân, Ngơ",
            path: './music/TDNL.mp3',
            image: 'https://guitarquynhon.com/wp-content/uploads/2020/10/bia-hop-am-tinh-dang-nhu-ly-ca-phe.jpg'

        },
        {
            name: "Đâu cần một bài ca tình yêu",
            singer: "Tiên Tiên,Trang",
            path: './music/DCBCTY.mp3',
            image: 'https://avatar-ex-swe.nixcdn.com/song/2019/05/17/9/0/5/2/1558073668026_640.jpg'

        },
        {
            name: "Nghe như tình yêu",
            singer: "HieuThuHai",
            path: './music/NNTY.mp3',
            image: 'https://ss-images.saostar.vn/w800/pc/1625851857046/saostar-x15p1stpjgmifrex.jpeg'

        },
        {
            name: "Nơi này có anh",
            singer: "Sơn Tùng MTP",
            path: './music/NNCA.mp3',
            image: 'https://loibaihat.co/wp-content/uploads/2020/02/loi-bai-hat-hay-trao-cho-anh.jpg'

        },
        {
            name: "Muộn rồi mà sao còn",
            singer: "Sơn Tùng MTP",
            path: './music/MRMSC.mp3',
            image: 'https://i.scdn.co/image/ab67616d0000b27329f906fe7a60df7777b02ee1'

        },
        {
            name: "Làm người yêu anh nhé bae",
            singer: "Ba chú bồ đội ",
            path: './music/LNYAN.mp3',
            image: 'https://imgt.taimienphi.vn/cf/Images/td/2018/3/23/loi-bai-hat-lam-nguoi-yeu-anh-nhe-baby.jpg'

        },
        {
            name: "Yêu 5",
            singer: "Rhymastic",
            path: './music/YEU5.mp3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeI8N5ykBE9M-CsmFvU3uR7xzos7V2rvgbRw&usqp=CAU'

        },
        {
            name: "Đã lỡ yêu em nhiều-remix",
            singer: "JustaTee",
            path: './music/DLYEN.mp3',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMEQeq5-SXksYpqFAYpBCyukOAbq-UAheYtw&usqp=CAU'

        }

    ],

    render: function() {
        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index=${index}>
                <div class="thumb" style="background-image: url('${song.image}')">
                </div>
                <div class="body">
                <h3 class="title">${song.name}</h3>
                <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>
            `
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            } 
        })
    },
    
    handleEvent: function() {
        const cdWidth = cd.offsetWidth;
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)'}
        ], { 
            duration: 10000,
            iterations: Infinity
        })

        cdThumbAnimate.pause()

        document.onscroll = function() {
            const scrollTop = document.documentElement.scrollTop || window.scrollY;
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ?  newCdWidth+'px' : 0
            cd.style.opacity = newCdWidth / cdWidth
        }

        playBtn.onclick = function() {
            if(app.isPlaying) {
                audio.pause()
            } 
            else 
            {
                audio.play()
            }

            audio.onplay = function() {
                app.isPlaying = true
                player.classList.add('playing')
                cdThumbAnimate.play()
            }

            audio.onpause = function() {
                app.isPlaying = false
                player.classList.remove('playing')
                cdThumbAnimate.pause()
            }

            audio.ontimeupdate = function() {
                if(audio.duration) {
                    const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                    progress.value = progressPercent
                }
            }

            progress.onchange = function(e) {
                const seekTime =  e.target.value / 100 * audio.duration;
                audio.currentTime = seekTime
            }

            nextBtn.onclick = function() {
                
                if(app.randomSong) {
                    app.randomSong()
                } else {
                    app.nextSong()
                }
                audio.play()
                app.render()
                app.srcollToActiveSong()
            }

            prevBtn.onclick = function() {
                
                if(app.randomSong) {
                    app.randomSong()
                } else {
                    app.prevSong()
                }
                audio.play()
            }

            randomBtn.onclick = function() {
                app.isRandom = !app.isRandom
                randomBtn.classList.toggle('active', app.isRandom)
            }

            repeatBtn.onclick = function() {
                app.isRepeat = !app.isRepeat
                repeatBtn.classList.toggle('active', app.isRepeat)
            }

            audio.onended = function() {
                if(app.isRepeat) {
                    audio.play()
                } else {
                    nextBtn.click()
                }
            }

            playlist.onclick = function(e) {
                if(e.target.closest('.song:not(.active)') || e.target.closest('.option')) {
                    if(e.target.closest('.song:not(.active)')) {
                        app.currentIndex = Number(e.target.closest('.song:not(.active)').dataset.index)
                        app.loadCurrentSong()
                        app.render()
                        audio.play()
                    }   

                    if(e.target.closest('.option')) {

                    }
                }
            }
        }
    },
    srcollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').srcollIntoView({
                behavior: 'smooth',
                block: 'nearest'
            })
        }, 300)
    },
    loadCurrentSong : function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    randomSong: function() {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex == this.currentIndex)

        this.currentIndex = newIndex
        this.loadCurrentSong()
    },
    nextSong: function() {
        this.currentIndex++
        if(this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    prevSong: function() {
        this.currentIndex--
        if(this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    start: function() {
        this.defineProperties()
        this.handleEvent()
        this.loadCurrentSong()
        this.render()
    }
}

app.start();