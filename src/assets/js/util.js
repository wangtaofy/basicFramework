import store from '../../store'

export default {
  // 获取网站环境
  browserDetection () {
    // 获得浏览器信息转换为小写
    let userAgent = window.navigator.userAgent.toLowerCase()
    let browser = null

    if (userAgent.match(/ipad/i)) {
      browser = 'ipad'
    } else if (userAgent.match(/iphone os/i)) {
      browser = 'iphone'
    } else if (userAgent.match(/midp/i)) {
      // 来自移动平台 平板
      browser = 'midp'
    } else if (userAgent.match(/rv:1.2.3.4/i)) {
      // 来自火狐移动版
      browser = 'rv:1.2.3.4'
    } else if (userAgent.match(/ucweb/i)) {
      // 来自UC浏览器
      browser = 'ucweb'
    } else if (userAgent.match(/android/i)) {
      // 来自安卓端
      browser = 'android'
    } else if (userAgent.match(/windows ce/i)) {
      // 来自windowsCe 操作系统
      browser = 'windowsCe'
    } else if (userAgent.match(/windows mobile/i)) {
      // windowsMobile 操作系统
      browser = 'windowsMobile'
    } else {
      // 来自PC端
      browser = 'PC'
    }
    return browser
  },
  // 用户刚进页面时判断要显示的语言
  userLanguageInit () {
    // 先判断localStorage中有没有user_lang，有，说明用户选择过语言，显示用户选择的语言
    // 没有，说明用户未选择过语言，则显示当前浏览器设置的语言
    // 目前支持3中语言，如果浏览器默认语言不是其中一种，则显示日语
    if (localStorage.getItem('user_lang')) {
      store.commit('changeCurrentLang', localStorage.getItem('user_lang'))
      return localStorage.getItem('user_lang')
    } else {
      let lang = navigator.language.substr(0, 2)
      let currengLang = store.state.langs.indexOf(lang) > -1 ? lang : 'ja'
      store.commit('changeCurrentLang', currengLang)
      return currengLang
    }
  },
  dateFormat (date, format) {
    date = new Date(Number(date))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    month = month < 10 ? '0' + month : month
    let day = date.getDate()
    day = day < 10 ? '0' + day : day
    let hour = date.getHours()
    hour = hour >= 10 ? hour : '0' + hour
    let minutes = date.getMinutes()
    minutes = minutes >= 10 ? minutes : '0' + minutes
    let seconds = date.getSeconds()
    seconds = seconds >= 10 ? seconds : '0' + seconds

    let time = ''
    if (format === 'MM:dd') {
      time = `${month}:${day}`
    } else if (format === 'MM/dd') {
      time = `${month}/${day}`
    } else if (format === 'yyyy-MM-dd') {
      time = `${year}-${month}-${day}`
    } else if (format === 'yyyy-MM-dd HH:mm:ss') {
      time = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
    } else if (format === 'MM/dd/yyyy') {
      time = `${month}/${day}/${year}`
    } else if (format === 'yyyy.MM.dd') {
      time = `${year}.${month}.${day}`
    }
    return time
  },
  // 获取北京时间
  getBeijingtime () {
    // 获得当前运行环境时间
    let d = new Date()
    let currentDate, tmpHours
    currentDate = new Date()
    tmpHours = currentDate.getHours()
    // 算得时区
    let timeZone = -d.getTimezoneOffset() / 60
    if (timeZone < 0) {
      timeZone = Math.abs(timeZone) + 8
      currentDate.setHours(tmpHours + timeZone)
    } else {
      timeZone -= 8
      currentDate.setHours(tmpHours - timeZone)
    }
    return currentDate
  },
  // 获取url指定的参数
  GetQueryString (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg) // search, 查询？后面的参数，并匹配正则
    if (r != null) {
      return r[2]
    }
    return null
  },
  // 手机验证
  phoneCheck (phone) {
    let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
    if (reg.test(phone)) {
      return true
    } else {
      return false
    }
  },
  // 邮箱验证
  emailCheck (email) {
    let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
    if (reg.test(email)) {
      return true
    } else {
      return false
    }
  },
  // 身份证验证
  IDNumberCheck (IDNumber) {
    if (IDNumber.length === 15 || IDNumber.length === 18) {
      return true
    } else {
      return false
    }
  },
  // 身份证生日提取
  getBirthByIDNumber (idCard) {
    let birthday = ''
    if (idCard) {
      if (idCard.length === 15) {
        birthday = '19' + idCard.slice(6, 12)
      } else if (idCard.length === 18) {
        birthday = idCard.slice(6, 14)
      }
      // 通过正则表达式来指定输出格式为:1990-01-01
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    }
    return birthday
  },
  // 身份证性别提取
  getSexByIDNumber (idCard) {
    let sexStr = ''
    if (parseInt(idCard.slice(-2, -1)) % 2 === 1) {
      sexStr = '男'
    } else {
      sexStr = '女'
    }
    return sexStr
  },
  // 判断是否在微信中打开
  isWechat () {
    var ua = navigator.userAgent.toLowerCase()
    // eslint-disable-next-line
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true
    } else {
      return false
    }
  },
  // 复制内容到剪切板
  copyContent (elementId) {
    let Url2 = document.getElementById(elementId).innerText
    let oInput = document.createElement('input')
    oInput.value = Url2
    document.body.appendChild(oInput)
    oInput.select()
    document.execCommand('Copy')
    oInput.className = 'oInput'
    oInput.style.display = 'none'
  }
}
