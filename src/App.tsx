import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Play,
  ArrowUpRight,
  Check,
  Plus,
  Minus,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  ShieldCheck,
  Cpu,
  BadgeDollarSign,
  Users,
  Sparkles,
  Award,
  Film,
  Tv,
  Compass,
  Lock,
  LogOut,
  Edit3,
  Trash2,
  Upload,
  ArrowUp,
  ArrowDown,
  Eye,
  CheckCircle2,
  AlertCircle,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Layers,
  Volume2,
  MonitorPlay,
  RotateCcw
} from 'lucide-react';

// ============================================================================
// TYPES & INTERFACES
// ============================================================================

type PageRoute = 'home' | 'projects' | 'gallery' | 'contact' | 'admin';

type ServiceCategory = 'Smart Theatre' | 'Home Theatre' | '3D Theatre';

interface ServiceItem {
  id: string;
  number: string;
  name: ServiceCategory;
  shortDesc: string;
  details: string;
  applications: string[];
  image: string;
}

interface PackageItem {
  id: string;
  name: string;
  price: string;
  unit: string;
  popular?: boolean;
  features: string[];
}

interface ProjectItem {
  id: string;
  title: string;
  location: string;
  shortDesc: string;
  overview: string;
  description: string;
  servicesProvided: string[];
  images: string[];
  videoUrl?: string;
  featured: boolean;
}

interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  aspect: 'wide' | 'tall' | 'square';
  order: number;
}

interface SiteContent {
  heroBadge: string;
  heroHeadline: string;
  heroSubheadline: string;
  introHeading: string;
  introText: string;
  missionText: string;
  smartTheatreHeading: string;
  smartTheatreSubheading: string;
  ctaHeading: string;
  ctaSubtext: string;
  contactHeading: string;
  indiaAddress: string;
  uaeAddress: string;
  phoneUae: string;
  phoneUaeSecondary: string;
  phoneIndia: string;
  whatsappNumber: string;
  email: string;
  instagramUrl: string;
  facebookUrl: string;
  youtubeUrl: string;
  youtubeShowcaseId: string;
  heroSlide1Image?: string;
  heroSlide2Image?: string;
  heroSlide3Image?: string;
  aboutImage1?: string;
  aboutImage2?: string;
  missionImage?: string;
  traditionalClassroomImage?: string;
  smartClassroomImage?: string;
  smartTheatrePhoto1?: string;
  smartTheatrePhoto2?: string;
  smartTheatreVideoThumb?: string;
}

interface EnquirySubmission {
  id: string;
  name: string;
  mobile: string;
  email: string;
  country: string;
  service: string;
  location: string;
  message: string;
  createdAt: string;
}

// ============================================================================
// VERIFIED BSQUARE GLOBAL ASSETS & INITIAL CONTENT
// ============================================================================

const BSQUARE_IMAGES = {
  logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAA2UAAAD8CAYAAAD39wxFAAAACXBIWXMAAC4jAAAuIwF4pT92AAAFyWlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgOS4xLWMwMDMgNzkuOTY5MGE4NywgMjAyNS8wMy8wNi0xOToxMjowMyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjcgKFdpbmRvd3MpIiB4bXA6Q3JlYXRlRGF0ZT0iMjAyNi0wMy0xOFQyMzo1NjoxMiswNTozMCIgeG1wOk1vZGlmeURhdGU9IjIwMjYtMTEtMDVUMDk6MTY6MjUrMDU6MzAiIHhtcDpNZXRhZGF0YURhdGU9IjIwMjYtMTEtMDVUMDk6MTY6MjUrMDU6MzAiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVkOTVlNGMzLTIyYWMtMzc0Yi04ZDI5LTNkYWI4Y2M3YzhjZiIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOjQ1M2ZmMTQxLThhZTktNzc0MC04ZmNjLWQ4ZWQ2YjM2ZjI2ZCIgeG1wTU06T3JpZ2luYWxEb2N1bWVudElEPSJ4bXAuZGlkOmNlNTAzNGI5LWU2YzUtOTM0Yi1hMDczLTVjMzFiY2VlNDIxMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249ImNyZWF0ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6Y2U1MDM0YjktZTZjNS05MzRiLWEwNzMtNWMzMWJjZWU0MjEwIiBzdEV2dDp3aGVuPSIyMDI2LTAzLTE4VDIzOjU2OjEyKzA1OjMwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgMjYuNyAoV2luZG93cykiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjVkOTVlNGMzLTIyYWMtMzc0Yi04ZDI5LTNkYWI4Y2M3YzhjZiIgc3RFdnQ6d2hlbj0iMjAyNi0xMS0wNVQwOToxNjoyNSswNTozMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIDI2LjcgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRmOlNlcT4gPC94bXBNTTpIaXN0b3J5PiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjPs3QcAAC0wSURBVHic7d3NcdvIusbxZ06dvXgjMG8ExhQDMCYC80QgeMOtiQgMR0B6y42pCA4dgakAWANFMFQEF4rAd9FNS5ZJ4quBxsf/V6WasQh2v6RAEG9//vHjxw8BAAAAAPz4l+8AAAAAAGDMSMoAAAAAwCOSMgAAAADwiKQMAAAAADwiKQMAAAAAj0jKAAAAAMAjkjIAAAAA8IikDAAAAAA8IikDAAAAAI9IygAAAADAI5IyAAAAAPCIpAwAAAAAPCIpAwAAAACPSMoAAAAAwCOSMgAAAADwiKQMAAAAADwiKQMAAAAAj0jKAAAAAMAjkjIAAAAA8IikDAAAAAA8IikDAAAAAI9IygAAAADAI5IyAAAAAPCIpAwAAAAAPCIpAwAAAACPSMoAAAAAwCOSMgAAAADwiKQMAAAAADwiKQMAAAAAj0jKAAAAAMAjkjIAAAAA8IikDAAAAAA8IikDAAAAAI9IygAAAADAI5IyAAAAAPCIpAwAAAAAPCIpAwAAAACPSMoAAAAAwCOSMgAAAADwiKQMAAAAADwiKQMAAAAAj0jKAAAAAMAjkjIAAAAA8IikDAAAAAA8IikDAAAAAI9IygAAAADAI5IyAAAAAPCIpAwAAAAAPCIpAwAAAACPSMoAAAAAwCOSMgAAAADw6N++A+iyTTwLJIWSppIC++tA0o2PeAbsQVIm6Wh/9pLSxeqQ+QoIAAAAaMsfP3788B1DZ2zi2UTS3P6EIvny7UHSVtJusToc/YYCAAAANIOkTD97xJYyyRiJWDfdS9ouVoet70AAAAAAl0adlNlkbC3pnd9IUMKjpITkDAAAAEMxyqTMDlNcS7r1GwlqeJC0XKwOe9+BAAAAAHWMLinbxLO5zDwlhikOw5fF6rD0HQQAAABQ1aiSsk08W0v66DsOOPcgac5iIAAAAOijUSRldrjiTswdG7InSeFidUh9BwIAAACUMfikzCZke0lv/UaCFjzJzDPb+g6kpLmkSNLEaxT9sLf/zSSlet7bDgAAoLcGnZSRkI3Wh54kZlOZ+Y304NZ3L5Ok7WV6xQEAAHpjsEkZCdmo9WEoYyBzfrLgjHtPMsnuWvSiAQCAHviX7wAatBYJ2VjdSNpv4tnUdyBXbEVC1pQbmQV9/pF5nwOfwQAAAOQZZFK2iWdLsQfZ2N2ou8PYEtFg0JZbSX/LJGcTr5EAAABcMLjhi5t4FsjchAGS9HmxOiS+g3glE71kPjzJLKiy8xsGAADAr4bYU7b2HQA65ZNN1LtiLhIyX24k/Vem1wwAAKAz/u07AJc28SxS8yvZPcj0dBQ1lfSmkUhQ1FpS6DmGk8B3ANCtzOdyrnKfZQAAgEYMZviiXW0xVfMJ0F+L1WFf5gk2tlDSUix/7st/FqvDzncQMgniR99BQJJpYAl8BwEAADCk4YtzdbRHarE6ZIvVYbdYHUJJf0l69BzSGK19B2AFvgPAT2/FUEYAANABQ0rKEt8BFGF72QJJd34jGZ03m3gW+g4CnXMrs/gHAACAN4NIyjbxbK6O9pKdY3vOIpGYtW3pOwB00lpmjhkAAIAXg0jK1NOWbhKz1r238/uAl27Uk552AAAwTENJyt77DqAqm5g9+I5jROa+A0An3Yr5fgAAwJPeJ2V26GLfRb4DGJG57wDQWUvfAQAAgHHqfVKm7uw/VdlidUjFMMa2hL4DQGfdSpr4DgIAAIzPEJKywHcAjqx9BzASN5t4FvgOAp0V+Q4AAACMzxCSskFsxmx7y4a6f9mjpC+SPsjs0/a/i9XhD/v/f0n6LOm+xXiCFutCv4S+AwAAAOPzb98B1LGJZ1PfMTi2lxlCNRT3khK7N9tvXvx+L/38e0Yyc3tuGoxr2mDZ6LfeLhoEAAD6q+89ZVPfATiW+g7AkUdJfy1Wh/BSQnbOYnU4LlaHRObv+q2Z0CTRU4brQt8BAACAcel7UjY0qe8AHPgmKSiTjL1mN9eeywx3bMKkoXIxDIHvAAAAwLj0PSkLfAfgWOY7gJruFqvDfLE6ZC4KW6wOW0l/uigLKCHwHQAAABiXvidlE98BuGQX++irb3YjbKfse9JUjxlwztR3AAAAYFx6vdAHOuNRDS4lvlgdtnYZ+49N1dFzj5K2Vx4/2p82ZGpmGG4os/H3XNKbBsp/adpw+QAAAL8gKYMLkashi1ckaueGvI+OMu/PkO3tz1LmtX5qsC7OMQAA0CqSMtR1X3RRj008m8gkVlP7q0zSbrE6HPOeu1gdsk08SyR9LR8iBiaRSUQ5FwAAwCD0fU4Z/NsWOcgmVEeZG+lP9mcl6Z9NPNsX2XPOLvzxVC1MDMxWUuw7CAAAABdIylCLTZSu2sSzrUwSdmlD6HeSUjtvLE9ufRiNtcx8uiaEDZULAADwG5Iy1HGfd4AdsjgtUNaNiiVcuwLHYDwS3wEAAADURVKGOvZ5B9iNoEOZZe3zhh6+3cSzeU55uXViVHYNlZs1VC4AAMBvSMpQx7HogXaYY1jg0HmBY5hXhpNMzQxhTGs8dyqzRcRapuHiKOnHQH8ymR7uaY33q4pQppd0J/Me+34fftg4djau0P1Lrm0q87c6qtjr6aO98l/XTmYV16mH+MoIZWLNVP2zuVOx79QuCGXi9f05rvpe7+3PWub8Ct28LaWEMp/xTP7fkzZ+durP+V0ISRnqOJY52G4Enbc4w7RAUWmZejF4R98BWJHMufmPzII2H2XmS77xF1LjbiTdyrzmqOG6Aj3fcHyXmaf6XuY97oJ3MvF8kokvk5+E9ZxI5ty81bDPxyLeyywylar5c7aKiczN5neZWG8qlnNjn/9fW96kdmTNifT8evvoRubz/07mur+SeT2nxCFS8+9/ZOu8VfVzpm9O5/facxzOkJShVYvVYa0Cc9GAEqae6w/1vLLoW6+R+PVVzdzkhjIt0H+rXzccLxPWrfydp3OZv01f3re23Ki5c7aOvdwnJ+9VYLqBJ3MNe3uT9zKv7/9krgNhA3WEGvZ7mOejBtJjRlIGH9ZXHjsWeH7gJAoMwUTuW/7LNBpEMq2TY+99OFnLXYvwROYm5ru60xtW1Sk5S1qudypWrM3zVf4bdk4SNdew81bd7FFY+w6gRbcy17O93N7HbB2W1Vdr3wG4wObR/RGr2LC9iX79sL/8d1dubPYVHzuhxRcn8wbKzAoeF2ncrZPn3MjMp0hqlhPIDPsZWrL7SeacnaudYbeJuF4Wkch/j9lE5rPTpI8yN/Bpw/UUFWh4n/Ei3sn0/H+ROfeyGmUFGud7+NobPY+q6C2Ssv5IS6w8uLv0gF2iPnj10+qQq8XqkG3i2aN+v5A85O17tolnYVNxoXcmaqbnYV/gmFAkZJfMVe/vEmnY7+1bmZviuZq/gZg3XP5Q3Mp/UpaonQR6Kf+v9WTuOwDPPsp8l0SqniiHbkIZhFAkZeiTxeqQ6XmVIEk/E7W5/QlV/IthvYlnWcVQJq/+/aRiXxTzivVheNZqpoVwn/P4RAwXuaZOI0+kYSdkJzcyw5g+qLlzKRC9ZGWE8ndDN5W5QW/DrUwCeGypPlz3Vua8W6ratWDiLhT4RlKGU6K2lbR9kaBFyh/u6KqH7V5StFgdjgWOnTuqE/01lTlfmxiO+6T8FsulGC6SJ1D5lt9I40jIXjq93m0DZU8bKHPIAvlLyqKW60s81InLTovOSDT4jRpJGX7xKkELZG5Ab88cWncFxaP92dml8nNt4lkkbobHLJC5kYjUXA/ArsAxy4bqHpJJyeNDjS8hO1nLJLCp43IDx+UN3cRjvcuW66S3rJtIzEaOpAwX2WQp2sSzRObG4bRM74e8uV+u2R68pM06B2Cqeq3lE7V7YzfV5XgDtTMUa53z+FwMCXMtULFkeKhuZHpopqo34R/9tJSfa0okvlO76KtMsrz3GwZ8IClDLjuscG4X2dhK+mp7rYoOOXQhEb1kZUUyq72hmHvl91bMmw9jVCYy15SxJ7o3Molp6DcMtGwifz3vS5lGqMxT/bhsJxppRol9ylDYYnXYL1aHqcwyru8kpTY5a9Qmns3V3iRojFdS4Jiw4RjGJtG4N9x+6Z0YGjs2kfw1SJy2r0D33Ggg+26hHJIylLZYHZaS/rL//LqJZ6cFQpyz89q2TZQNvPBNxVZdpLfWnVA0tryWiNXUxmTZgfonnmPAebeiEXB0SMpQid0zbSoz5OtW0n4Tz6Yu67C9cHsxtAnNKrodQ9BsGKOT+A6gg2ghH49I/ht56C3rtsR3AGgXSRkqW6wO2WJ1CCXdyW6Ianu2atnEs8kmnq1lJrySkKFpoYqN3Z82GsW4hGpmS4MhuBXn2hgkvgOwIt8B4KJ3ojFwVEjKUNtidYgkxbKriNVJzGzvWCqGNaEdH1R8KfJpc2GMTuI7gI5LfAeARkVy00tWd2saycQROSgHzVj6DgDtYfVFOLFYHdabeJbJ9G7tN/EsLLL/mF3RcSrTcj4XPWNozwcxX9GHQPSS5bmVuRnL/IaBhkQOyniS+d48qn6Cl4hrYVfNfQeA9pCUwZnF6rDdxDPpTGJmFwLZi5XW4N+TzBfdvuTzAteBjFTkO4CeiMT8siEK5aZRYv3iv6uaZZ16y7Y1y4F7NzLfV7sGyr7TsP7mR98B1EVSBqdsYhbIDD/8mZgtVofMDk2cX3jqVOaml6QNTfomc/ORVXjupEa9TzJffkXrTUsc20Xplccih/U8ydys7OT3/ZrKXNveOywzEknZECUOynjS87mxtWXWHWWyVL9u0LuYUMztj+sFXEI1k5QdxSbVnUJSBucWq8PS9oz9XJXRLgqSKmf+jn1eJPMF4XtlKgzLvaonZHUl4gZbMjcXroYof1a3Nr/dyiRnO7lpXHpryzs6KAvdEMpdL1lm/z+z//5Us8y3MvHta5bTlqO6F+te5t4lUf2/x0uBw7LQYSz0gaYsJT3oefGPSZEn2eRtbTep/txYdBijdzJf5HMPdace6uyi0FE5H2RufDJH5blylLmB+uKovNBROeiGyEEZL3vJTtb293UlDsqAeR8/OCyPObgjQVLWD09q8ObDLkGf2EU3nFisDpnMze+TTAvcukIZiaQ/ZZI7wIUbSf9V94a9jEXooIw+LNCylFmRtq7QQRkoZtJw+VOZ0SN17fT7/UAmN5+Jd+Kcc2UrM1zelcBhWegokrJue5LpLZoWWcmwhqVMV/v3TTzLNvFs62Ij6MXqcNRzy+DtJp7NK5SRynxJkJjBpVt1/8Z+iOq2+H5Rf/5ua9VfsjysHwYKChouP2m4nLWj8iNH5cDtcvYTh2Who0jKuuubpGCxOiS216kRdljh8sWvbmRuWP+xydmkTvmL1WGn59aiSsmeff2hSMzgFolZu4Kaz39S/4ZXRTWfz7zaYZjKTS/ZnS7PMTzax+ti83J3jnLXWzZxVA46jKSsQ14kLPFidZjbnqamJbo88f5W0rHOZtDWUuaG6kYVW/NeJGYuxs0DJ7dqp2U4bKGOrpvUfH6i7s0hy3NU/RvlsH4Y8CxpqZy26kFxqaNyAkfloMNYfbEj7HLxiaQ/Gx6q+LLOUGbp+mtOC3UU2gz6nMXqcNzEs7XMEMn3tqx9hXIyOwTye5U4gAvWMqtmHRusY6l2VgqbyN2XdyqTBJ3+W1dY8/lbBzH4sJabXhL000RuFhf6pvxr1NEeV3drhluZ+5G8+gA4RFLWAZt4tpW5kZq3mJBNVLzXykViltjE843MMMaoSjnWg9jPDO7cyNzwhw3X0efGhEeZ5GwnP3uCPXio05VUzyMFqgjVvaW/UdxSbraBWJc4zsV+eUu5nRMFIAdJmUcvEqNQZv5Y1mL1icolNqcb16BmnV9lErM+36BieN7JtGbv/IbRWW/sz3uZz/CdyrekT2rUn9Z4bhekYlnrMZrITWJzr+KJ+d4eX/d8i9TPIcNdM/EdQAV7+bte/eGp3k5gTplfe9kd4NtMyOwQwLxhi+e8rdPDtVgdtjIt7kAXrXMeT1uIoS9uZd6PqMRzghr1HWs8twsy3wHAi6Xc9JIlDR9/zo3oKXNh7qicvaNy0GH0lHlihyxOJVUeElix3qn8zs1YS1p5rH9Mjqq/JPdrqdq5wTzKfD6mMj3JbaxC90bXh4plLcTQJzcyvWaBuHnLk8rNkDL0S+SgjAeVvyHfy80w/6XMd3ZWs5yxCsUKqiiBpMyDTTxLZFqaP7SckE1khmdVbbl7tL1ddWxFUtaWrfq7OMJrkUzrb9NfcJEu3wAdG667rz7K3LQlfsMAOiWSm+vVusbzvtas+9RbltQsZ4wmcrd3nMT3zygwfLFldsXDT5K+OUhwylqrXsvZsm4Adpimi71UMC5bmR4ZV3u+XDK/8tix4br77JNYur1rJr4DGLnEQRmPqt6wtpWb6QJLB2WMzUTm/Xe5INnRYVnoKJKyFtmeqq3MSlxRy3VvVW9Z5nu7EbQLrsrBuGQySVOTm4jf6HJysW+w3iHY+g4Avwh8BzBikdz0kiWeny+Za2LkoJyxiOR+uLLraQjoKIYvtiuRuVB/bnlhj6Xq75OT1I/EWKwOu008q7NENMYtkvR3g+WHupyAudgDaKjeyPxttn7DALxbOiijTi/ZyVZuhn0n6s/nOpKZi9ymiUwjSFMrFu4bKhcdQ1LWErvAxkeZXrJ1i/VGqj+H60uVzZ5z7MSGqqgmlRkC29T5E1x5bCeSsmsi9efmDWhCKDfD1tYOypDM5/FTzTL61OASaXjbT+x8B4B2MHyxPYn9766tXjK7oEjdib6PamaS776BMjEe2wbLnlx5bCe2dbjmndpvpQa6JHFQxpPcXePWtry6IgdloLxHsR3LaNBT1gI7l+zUqr9vqc6t3PQkRA0lkTvVTxgxXvsGy77WyprpeRN0nBeqHy3qGJ6wA/W76KVZy90y9JlMXBNH5aFdW98BoD0kZSVVHMYXvfj/o5NALnix7L2LL4Ymhi1KMqswbuLZo9jDA9Xdy88wla2GOUTGlVDcSGCclg7KaGKKQ+q4PLSj1eku8I/hi+2I2qhkE88CmYuvi5vFh8XqsCxQZ1ijjrTGcwGf5nIzJGiIpr4DADyYys18063YrBnGWpwLo0JS1jDbc/Vy0u+0oXoSmRXpXPQ8PanAMBCbkG1r1JPWeC7QZE9VkPN4JvMZaXJ5/r6iBxFjlDgqZ+2oHPQbvWQjxPDF5oWv/h3J4dAe2zu2lbtNCp8khQXnka1VLwlMazwX4zbpQPmpzOd7LVYSBcZsKjfXgDuxSTCMSPSSjQ5JWfOCV/9+t4lnYd25WnaJ/URubwZPCVlaoP6l6ieCWc3nY7zmvgOwMpkvz8T+zMX+e5K5ST2++l2q6r1ok+qhYEQCVT9XMlVvKEwqPq+pctBvX8Qy+KNEUta8yZnf7TbxbF4lMbM9Y0u5b5l/lDQvmJBN5eDLY7E67DfxrG4xGKek4fL3JY8/6nnu6Fzm5jC0/w40vkRtqt+TsqxGeUGN52I81qqe+N+r2uqNE7lrJPrHUTlt+F/Rq9eEB/lPzpeiIcwLkrLmBWd+dyPp+yae3UlKFqvD8VoBNgmay9z0uRqm+NKDig9ZlEwLzukmk8UO0Lalur1q5079buUMJX33HcQrzFNDVy01vkYXySQOkecYhuZJ5l4v8xsGU0t8ISnz61bS7SaePch8CI6vHg9lWpybvAG9k7QsmpDZ/c9eJoap+5CAiyJJK99BDNxe5rrgujc+rfn8SCy1j26ZyM0y+H10K/PaM79hDMaDzD1f5jcM+ERS1ryj8lt536qZHrBrnmSSsW3RJ2ziWaTfb9QydyEBVyWSPrVQz2MLdXTdsYEys5rPj0RShm5Zapy9ZCdL+R9qNwR3IsGFSMracPQdwBkPkqIi88dObEL29cxDezchAWeFMsM55mpvyOKxpXrGZl/z+e9kzoNd3UA82Kr66z86i2L42h7mGrVcX9csxV5adTzJJLVrv2GgK0jKSqqwcmLaUChVfV6sDkmZJ1xJyCSSsi6Yyk1rZeigjDx9mBuU+g5gwB5Ub1TAVuY8TR3E0qaj2k+usprPD9Wv6/uk5foidXtuaxtuRG9ZVfSO4TckZc3b+w7AupcZrpiWeVJOQvZYtjw04o3aGdY3FqnvAAZsr3pJ2Y1MT1koepDypJLe13h+pO58fxWxbLm+pOX6umopesuKepK5fiXi+oUz/uU7gKGzC2jceQzhUdKHxepQaP+xl3ISMqmfw4iAPKnvADpg0lC5ewdlvNHzxt1ozq36MzwvUv2GqbRkfWPvJTu5UXf2jeyyJ5nVuCORkOECesrKm1R4zlruVzLL8yRpXXao4oldZTEv5nWVsl/UManzfKABTyIpiyR9bKjsncx7XHdxhBuZZfvvZa5Du5rlDVHmoIyv6n6v5FRuvl+zEscuHdQ3JIlYhCfPjZ6HXwNnkZSVF6jkDcBidUg38eyLmrvReelJ5iZlXWLfsZ9sorRT/tyf+7z91QoIaj4fcG134fd79WM+XB/s5K6R6p34u3zW+aF0qaPy225Q9OVY8LhQ7a+W3HVv1J3VUbdyN+x2L/P3djU94J3M/dnSUXkYGJKylixWh+UmngVq7gbiQSYR21YtwMa3U7FhGUnVel6YOCgDcGl35ncTceNfVnblsa3Gc6PfhsmF3x9bjGEIjgWPSxqMoc8SdScpc2kvk5i5+g74aMvcOSqvjlDDOp/36tc82N+QlJUXVn3iYnUICw4LLOo0aXRdd8GNTTxbqvimvPclV6C8JHBQBuDK6fP0WthuGIOQXnlsLzPXlTk5bgQXfn9sMYYh2Bc4JhQNNJd0qbfMtUjmmuZqT7qturGK7BBHGux9B1AHSVl50zpPXqwO0Sae7WS6sKvclDzKtrIsVoddnVgkaRPPpjIXiDIfzKRuvVbgqBzAhd2F30ctxjAWia4vIoTigiuP3Wt4N11NeCh4XNJkEAMQaZhJ2VHmb1+04TrPy/llmaMyMQAkZeXVbt21ydTODheMZL5UA/3eCvMoczFITz8ul6C3vWPJmXqv+eaol0wiKUO3JGd+N1G9ZcXH6LHAMVuZ95vesvpuZBoLj2ce24ukrIi0wDFT8V7meaf+7W9X1FpmlUlX58BbW2bkqDwMAElZBRU2kD7LJljLuuWUtYlnoczFoOxk5Sc5itf20HFDhq74rPM3tVG7YQzCseBxkcwKiqgv1Pkeip3Yw7CIfYFjEkd13TsqpwkuEo5Ewx3yvZT0t8PybmU+ozuHZaLHSMqqCdXDliCbCCWqPqdt6WDFxZPQUTlAXY+6vL3Dsr0wBmNf4rhvoifShbnOJ2WpmL9XxC7n8anczAW/U7cberaq/zqH3FuWyjTguWzo2MqMGjo6LBM9xebR1YS+AyhjE88mm3iWyFxQql5w7+qs7HhG6LAsoI5I58f1J+Jmtop9iWMjmR541BNeeWzXUgx9daf8eT2Jo7pcldOUxFE5kaNyuiiR297O0/wygKSsond92Pj4RTJ2lGnZqbpy0P1idYgchXUyd1weUMUHnU8iJqKXrIonlUvKMg37Bq4tN7r8Pq7bC6OXtjmPT+Sml+xe3e8NOcr0Xtd1q5qLonVcJLeNSe/U/YQdLSApq27uO4BLNvFsuolna9VPxiSzKtU8p76gTIGbeDaXu6Vl+2bvOwD8dKfLN2RbjfccrWNX8Tmf3YYxStGF3x9lznX87l751+Slo7oSR+U0be2onMRROV10lPvX90ksfjZ6JGXVzX0H8Nomns3tcvv/yGxQWPem8kFSuFgdsit1TlW+RWxeOaL+y3wHAEnX53ZEYp5TVUmN55E41HOay3POUgwTPWeZ8/ikwDFFFEn+umIvN8PzbnV5Y/MhWMv9oi07Dfs9Qw6Ssure24TEq008CzbxbL2JZ5mk/8rdzeSdchIya11mvzQ77NPV5tl9tPcdwMg9yQxZjC48HojhXlXdqd7wrEhuhk6NWXLh95kYJvparPyl8Jdy02OeOCijTYmjcpaOyumqSG4bO96I+WWjxuqL9URq+WJrk5pQprcpVDMLEXxerA5JgVi2Kj9caVk+nEFJxWpovjzIfGbTC49PZM5nhi2W52q7jLncrAA3Vu9k/g7rM4/tZBok2LTbNCCsCxy3dFDXo/rXGLeXm43HlzLvc1aznK46yrxGl5+p9yq3CXfmsG54RlJWz3ITz9YFepN+82LOVyopO7cptN1PTDLJ11TNJWEnj5KiInuw2QVEphVWZIxKRzU8S5leTbTjSebGILlyzETmRoRkubwnmWtT5qi8SOa6uHJU3tgkMudyeuaxrf3vmBOzosvSRxpnL9lJovr7CN7IfN8lNcs5J22gzCq2Mo1JLoe8r2VeX1rg2CLHjEXqO4C6SMrqqXPB2cp8cd5I0iaeOQqpsi+SkiIJ5iaeRTKvOyhTgX0eN72mxZr9mZr3KPM5W+t6wjCR+SyW3UwdzwlZ6rjctczfZCv+LmWdltgOdf6838o0CG41ruvxk0yitSt4fOKgzgf1dzjaXm56yyK5T8rKrvLatEjmM+VqlEXeZ/ilvcz7MfYRHl07JyphTll9yypzy2zPWCBz0fbpXtJfi9VhWSIh+6qSG0nbYZdJpQiHKZL/v/1QfZMZpjWVOeeyK8dOREJW1b3MNSxtqPzUlv9ZLFJR1luZ83py4fG9xvPePsm8zqmKJ2SR6iesT+r/olZz1T8/3sj9CJm1ujVsL5P71/hWxec3J47r7qO1unVOVEJSVt+NKi4MsFgdjovVIZCf5aBPyVhYZLii9HPI4ldV20h6qXG1yubJZG6KvvgNo/eeZM7lL5L+I+l/9DwvKU8o07pJQlbON0l/6fn9a1oic0Mdy/R+ophTYhZceDzT83v7QcNbZOVe5pyZKr9x5rWkZt2Pau/z0aRM5nXU/dwldQN54cFxea7s5P5e7lbFkr21xr167Z26eU6U9sePHz98x1CZTRI++Y7D+k+ZVQhfs71tiZqf4H4naVs0EZN+9nJtZYbbPdhEsjD72lJ1p3v9frE6hL6DeGEqk0gEGvaGm2VkOt8Dc9Tzjc6+RvmJunPt6LoHmb/F3v4c/YUiyXxO5jI3i4G6c13pqrLD9sIXPxP1o9HiXs/XjL3qXRvmqj7nt+iQ6b6ZyDSsRqreuPof/X4OJip+HX6SeW8Tdfu9ncv8/V01Qj/JXOeOBY5dalwN4EXmi/cKSZk7TzILX2R1CrEJzFLuJhlLpgV0J2lXNj672MjOxpK7b9mFMnbq1vypriVlaNdEbNKZJ1O/Jk0HYn+fPHsHZUzVnYajo5ppIJiq2ms8yn+DRRumcvf+lClrX6HOsZqqO5/TpmTq13dUISz04c5pYua8TiF2ntZSZq5aqOcWy0DFkrQnPbcWppL2FVeHnOi5d0yqnpBF6lZCBmTiC35oUt8BjMRRw088jhr+a6zjKHfvj8uy8Owo3tdeIilz6/0mnkUV5ludZYcY7l/+7sUy+a+dXVa/LJuMLfXrppnfZJbKz0qWNRUb8QIAAKBZU5l7zrV62vBKUube1008S10kSOeUmQtWhk3G5jJjc1+OR/6yWB2WFcvbifkeAAAAcGOiX6cgTGVGlJ3WZFi3GYxLJGXN2G/iWVBmyXhfbG9WpF97xiQ7ObzG4iVr9WOCOAAAAPohUP2NzTuJpKwZN5J2m3hWeg5WG170ikU6vzHkncw+ZFnF8tdqfhVJAAAAYBD6npTt1Z3VF197K9Nj1onEbBPPAj0vGnJp4Y1vktZ1hkjahT0+Vn0+AADwYirTWBuo+dVME12e97PW+RVyl+r3oj4TmdcdnHlsq2L7a2LA+p6UdV3ridmLhUACmQtAqOsrNz7KzP1a1x1uaROyr3XKAAAArQpkEqFzI2ea8l3S/+r3VQK3ujzSZtJcOK3Y6/K0jn17YaCr+p6UZb4DKKCVxMwmRKFMS9e1C+u9zEUwlVkuP3VUf6Lu9lq+tvcdAAAAHZDI33d3pF83/g3VzNSH0GFZmar11oUa1jz7iUwyH9YsZy/zfmY1yxmEXidli9Uh3cQz32EU8VbS0SZmaRMV2GX4t02UnWcTz7bq1xyyzHcAAAB4tpXf7+7w1b8nDsueyiR8c7lfBfpJZoRRovHtBxbKvG5XvaqnBoE7jfP9/MW/fAfgwIPvAAq6kekxi3wH4somnk028SxVvxIyqd9j0gEAqGur7n13Bw7KmMi8tn9kXl8T2/Lc2LL/sXVNGqijayYyieh3NTPM9fR+Jg2U3RtDSMpS3wGUcCOzj9nWroDYW5t4Npdp0ehdd3xTe70BANADc3UvIXMhkBkO1+Zru7V1Bi3W2bapzGu8tEicS59k7usnLdTVOb0evmjt1b+Ly62kcBPPor4lCDaZTNTfFRb70rMKAIBrEw1zlb9A5n6wiZ6xPG9t3aGqdxSEcttLlOl5vlYdE1vOm5rllPHy/cxarNe7oSRlffRG0vdNPKu1J1ib7NDLtfxc9FzZ+Q4AAABPlur3d/g5E5nvdp+v60Ym2Q1VLZF4p2aGBT7KxLVWtbi2ajchO3lr6557qNub3g9ftMu497n341ZmEZCkq0MaN/Es3MSzvcxy932/mO98BwAAgCdL3wE0YCs/icNrb9W9OVFv9DwkMCj53FDtDFm85L3crpzZeUPoKZPMB3LlO4gabmQ+NMtNPFvL7BmWeY1IP/c8S9Tu3iVNemhq9UsAADpurmINq/cy91XHBmOR3AxNC+U3cXjto0zj795vGL95I+lvSR9UfPhq0lQwJSQaUWI2pKQsUf97cV4mZzuZ5CxtMwDbWzeXaU3r3SIeOda+AwAAwJN5gWPK3LR3wdJ3AGdE6l5SdvLV/nebc1yg/Ab5B5nXuasYy1TmvbpWzzt73LFiHb3yx48fP3zH4EQP98oq6kHmw+Nso+fXbCIWylyw5+p/cnvOk6RpF3ogAQDwINX1xtbP8ts7kuj6RtZ/6ddkZyLp/wqUey/TKLtX9d65QM/3SEUarP/nVV2hzHLyXfCk/EVJAl1P4jO5a+je6vr9e/yqrlDX38vX50lvDKWnTDIf5iEmZW9lh2Zu4tmjzIm2l5RWTdJsEhbInNihhjM88ZpODAkFAMCTa8nEk/o3mmRe4Jg7md6YulL7k6jYHm9zdbfH8bQoSXDlmFTtbTkV6fr7GbQThn+DScoWq8NxE8++qL9LtRfxRubEvZWkTTyTTE9aJvPhya48N5BpVQo0zJ6wa/r4ZQMAQFt2KtaLNJG7m+RM9W78g5zH7+UmIXstkhlSd61BO2igXpfeyryObYXnhi4DKWDacn3eDCYpsxKZk2xMScep5WsMvV1V9WLLAQAAGjLNefxYoIxAbvcCu1e9G/wg5/F1jbLzrOU2KXuUm3lTgYr/fRIVS8qmel5wowurXA7WoJKyxeqQ2b20/us7FnTG/WJ12PoOAgAAj6YOytirX43e+wbL3jkubyt38/lCmeGTeSPH3sgkcemFxycyyecQpwZ1Uu/3KXttsTrsJH3zHQc64UnNDF0AAGBMpupXQia5WXK/j/Yyq1L+WeDY+YXfT2w5JGQtGlxSZkXq94bScCOym4sDAIDqpr4DQGmpzIqa1wQXfr/V8LZF6rxBJmV2/lAk01OCcYptrykAAMAYrXMen5z53VTd2pB7NAaZlEmSXS4+FInZGN0tVoe17yAAAAA8ynIeD878LnEeBQoZbFImkZiN1N1idYh8BwEAQIekvgOAN9fugc/NEwwbigM5BrX64jmL1SHdxLNQ/Vs1COV9WawOS99BAADQMVnO40HO40flz096aSoWieiKa/e+5xK2vGXvT3u/7nV99cZrAv06dPJThTIGZ/BJmfRLYrYVExeH6gNL3wMAUMl7mZvk7MLjR5Ub1hbKf1I2lZu9v84JGyrXtSDn8fTVv6cFypzrebuB/cWjrnv9PJIyDXz44ksvhjLe+Y0Ejj1K+pOEDACAq+5zHl+3EYRDx5zHkwbrXuY8fmyw7jKWOY9nr/49LVDmvkIcKGA0SZlkVmW0843+I3Mzj377IimwCTcAALgszXn8VmZEUV+kOY/fqpkerUj5qxOmDdRbVqT83sq0QrmTCs9BAaMYvvjaYnXYbeLZXqYFYSnmmvXNvdiDDACAMraSPuYcc0pkdqq3+fK0xnOL2kla5RzzXWYu3Fr1N5OeyNwzFhlqt6tZVx0TNRvnUqzQ2Ig/fvz44TsGrzbxbCKSs764k7RdrA5734EAANBDR+Uv5NCWe/3ak5XoeiLxl34fOpeq+FoBD6qemE1K1hO8+l0okyBe8ig3Qx6nKv73fdT55LlIYvBZJsk/Fqwrz7U6X58noa6/l+fOk14YZU/ZS3aj6URSsolnkcwERjbN644HmQ/+jp4xAABqSSR99R2EQ2sVfz1tLfS2rvCcN2o/WU4u/P5J+Z0Un8TiHM6NPil7yS4WsZWkTTyby7R0hPa/9KK1416m5WUvaU8iBgCAM1uZm/Gu9JbVtZUZ6dSVlbXv1Y95eacG73P2onPCC5KyCxarw06vxtpu4lkgJjg2JbW9lgAAoDlzSX/7DsKhucwwxi40ni99B1BQdOWxnUjKvCApK4FV/gAAQM+lkj5oOMMYjzLJkO/X80HdWHUxT16cW3Wr93E0RrUkPgAAALSVuTn36fjq3/saZW3l7/U82bq3nuovqkyckT0eLSIpAwAAGJ+tzL6tvm6+t6/+nTko70+1uw/tg8zaA9uc49KmA8lRNM6T1B7fxT19j74DaApJGQAAwDjtZJZFv1O7ydmjzi9v/6VmuanM6/msZhOKR0mxzEJwaYHjM5mY2vZo6w1VPjFMZV5f0++lbPlF6zjKz3vZuNHvUwYAAABN9LzidJOOur459VTnF6LYqnwvSSCzEIgrmUwymVZ8/lTXF9lwJVO9OM8J7M/UYZmZfo1zqd8X1DvqfA/fVO7Ok04gKQMAAAAAjxi+CAAAAAAekZQBAAAAgEckZQAAAADgEUkZAAAAAHhEUgYAAAAAHpGUAQAAAIBHJGUAAAAA4BFJGQAAAAB4RFIGAAAAAB6RlAEAAACARyRlAAAAAOARSRkAAAAAeERSBgAAAAAekZQBAAAAgEckZQAAAADgEUkZAAAAAHhEUgYAAAAAHpGUAQAAAIBHJGUAAAAA4BFJGQAAAAB4RFIGAAAAAB6RlAEAAACARyRlAAAAAOARSRkAAAAAeERSBgAAAAAekZQBAAAAgEckZQAAAADgEUkZAAAAAHhEUgYAAAAAHpGUAQAAAIBHJGUAAAAA4BFJGQAAAAB4RFIGAAAAAB6RlAEAAACARyRlAAAAAOARSRkAAAAAeERSBgAAAAAekZQBAAAAgEckZQAAAADgEUkZAAAAAHhEUgYAAAAAHpGUAQAAAIBHJGUAAAAA4BFJGQAAAAB4RFIGAAAAAB6RlAEAAACARyRlAAAAAOARSRkAAAAAeERSBgAAAAAekZQBAAAAgEckZQAAAADg0f8Ds1x3ZtAz9fgAAAAASUVORK5CYII=',
  heroMain: 'https://bsquareglobal.com/wp-content/uploads/2025/08/001.png',
  traditionalClassroom:
    'https://bsquareglobal.com/wp-content/uploads/2025/08/Gemini_Generated_Image_76oa6v76oa6v76oa-2.png',
  smartClassroom:
    'https://bsquareglobal.com/wp-content/uploads/2025/08/Screenshot_22.png',
  edu01: 'https://bsquareglobal.com/wp-content/uploads/2025/08/edu01.jpg',
  edu02: 'https://bsquareglobal.com/wp-content/uploads/2025/08/edu02.jpg',
  edu03: 'https://bsquareglobal.com/wp-content/uploads/2025/08/edu03.jpg',
  theatre003: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre003-1024x628.jpg',
  theatre004: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre004-1024x628.jpg',
  theatre005: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre005-1024x628.jpg',
  theatre006: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre006-1024x628.jpg',
  theatre006A: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre006A-1024x628.jpg',
  theatre007: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre007-1024x628.jpg',
  theatre008: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre008-1024x628.jpg',
  theatre009: 'https://bsquareglobal.com/wp-content/uploads/2025/08/theatre009-1024x628.jpg',
};

// Architectural SVG Fallback generator if remote image fails to load
const createArchitecturalFallback = (label: string) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="640" viewBox="0 0 1024 640">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#151819"/>
        <stop offset="50%" stop-color="#1E2223"/>
        <stop offset="100%" stop-color="#111314"/>
      </linearGradient>
      <radialGradient id="glow" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="#ba8a40" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#151819" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="1024" height="640" fill="url(#bg)"/>
    <rect width="1024" height="640" fill="url(#glow)"/>
    <g stroke="#2A2E30" stroke-width="1" opacity="0.6">
      <line x1="120" y1="0" x2="120" y2="640"/>
      <line x1="512" y1="0" x2="512" y2="640"/>
      <line x1="904" y1="0" x2="904" y2="640"/>
      <line x1="0" y1="160" x2="1024" y2="160"/>
      <line x1="0" y1="480" x2="1024" y2="480"/>
    </g>
    <rect x="240" y="130" width="544" height="310" rx="18" fill="#111314" stroke="#ba8a40" stroke-width="2" stroke-opacity="0.5"/>
    <circle cx="512" cy="285" r="46" fill="#ba8a40" fill-opacity="0.15" stroke="#ba8a40" stroke-width="1.5"/>
    <polygon points="502,265 502,305 534,285" fill="#ba8a40"/>
    <text x="512" y="515" fill="#FFFFFF" font-family="sans-serif" font-size="24" font-weight="bold" text-anchor="middle" letter-spacing="3">${label.toUpperCase()}</text>
    <text x="512" y="548" fill="#ba8a40" font-family="sans-serif" font-size="13" text-anchor="middle" letter-spacing="4">BSQUARE GLOBAL • INDIA &amp; UAE</text>
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const INITIAL_CONTENT: SiteContent = {
  heroBadge: 'INDIA & UAE • SMART THEATRE • HOME THEATRE • 3D THEATRE',
  heroHeadline: 'Transforming Spaces. Creating Experiences.',
  heroSubheadline:
    'Innovative Smart Theatre, Home Theatre and Integrated Technology Solutions for Education, Entertainment and Modern Living.',
  introHeading: 'Technology That Transforms Experiences.',
  introText:
    'With a head office in the UAE and a dedicated development and engineering centre based in India, BSquare Global is a premier technology innovator pioneering smart environments for educational institutions, residential spaces, and corporate enterprises.',
  missionText:
    'Here at BSquare Global, we aspire to revolutionize ageing infrastructure and enhance everyday stories through technological improvements. We make every attempt to achieve superior technologies in order to deliver superior results that empower our customers to accomplish their targets.',
  smartTheatreHeading: 'Transforming Classrooms into Smart Theatres.',
  smartTheatreSubheading:
    'Build a revolutionary education space for learning, seminars, presentations, conferences, and video screening.',
  ctaHeading: "Let's Create Something Extraordinary.",
  ctaSubtext:
    'We create intelligent solutions for immersive Smart Theatre, Home Theatre, and 3D Theatre experiences across India and the UAE.',
  contactHeading: "Let's Discuss Your Next Project.",
  indiaAddress: 'SR Building, 708/D, Peyad, Trivandrum, Kerala, India.',
  uaeAddress: 'C1-IF-SF 4389, P.O. Box: 932, Ajman, UAE.',
  phoneUae: '+971 54 577 5599',
  phoneUaeSecondary: '0569417964',
  phoneIndia: '+91 97447 64007',
  whatsappNumber: '919744714449',
  email: 'projects@bsquareglobal.com',
  instagramUrl: 'https://www.instagram.com/bsquareglobal/',
  facebookUrl: 'https://www.facebook.com/profile.php?id=61577669343072',
  youtubeUrl: 'https://www.youtube.com/@BSquareGlobal.',
  youtubeShowcaseId: 'HLkVH_mYAiw',
  heroSlide1Image: BSQUARE_IMAGES.heroMain,
  heroSlide2Image: BSQUARE_IMAGES.theatre003,
  heroSlide3Image: BSQUARE_IMAGES.theatre006,
  aboutImage1: BSQUARE_IMAGES.edu01,
  aboutImage2: BSQUARE_IMAGES.theatre004,
  missionImage: BSQUARE_IMAGES.edu03,
  traditionalClassroomImage: BSQUARE_IMAGES.traditionalClassroom,
  smartClassroomImage: BSQUARE_IMAGES.smartClassroom,
  smartTheatrePhoto1: BSQUARE_IMAGES.edu01,
  smartTheatrePhoto2: BSQUARE_IMAGES.edu02,
  smartTheatreVideoThumb: BSQUARE_IMAGES.edu03,
};

// EXACTLY THREE SERVICES: Smart Theatre, Home Theatre, 3D Theatre
const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-1',
    number: '01',
    name: 'Smart Theatre',
    shortDesc:
      'We craft turnkey academic theatres with superior smart features for learning, seminars, presentations, conferences, and video screening.',
    details:
      'Smart Theatre is an advanced educational space designed with state-of-the-art audio-visual systems, interactive tools, and immersive technology. It transforms traditional classrooms into dynamic environments, making learning more engaging, memorable, and impactful for students, educators, and professionals.',
    applications: [
      'Educational presentations',
      'Seminars & Academic Talks',
      'Conferences & Symposia',
      'High-Definition Video Screenings',
      'Interactive Digital Learning',
      'Professional Audio & Acoustic Wall Systems',
    ],
    image: BSQUARE_IMAGES.edu01,
  },
  {
    id: 'srv-2',
    number: '02',
    name: 'Home Theatre',
    shortDesc:
      'Our team custom designs and installs domestic theatres that deliver beyond what the client envisions with 4K projection and Dolby Atmos sound.',
    details:
      'From compact residential media rooms to full-scale private luxury cinemas, we engineer bespoke acoustic treatments, 4K laser projection, Dolby Atmos surround audio, motorized recliner seating, and intelligent lighting scenes.',
    applications: [
      'Dolby Atmos & Surround Acoustics',
      '4K Ultra-HD Projection Systems',
      'Luxury Motorized Recliner Seating',
      'Custom Acoustic Wall Panels',
      'Smart Ambiance & Starry Ceiling Lighting',
      'Turnkey Interior & AV Calibration',
    ],
    image: BSQUARE_IMAGES.theatre003,
  },
  {
    id: 'srv-3',
    number: '03',
    name: '3D Theatre',
    shortDesc:
      'Immersive stereoscopic 3D cinema environments engineered with precision depth projection, surround acoustics, and custom theatrical seating.',
    details:
      'Designed for educational institutions, science centres, commercial auditoriums, and private entertainment suites, our 3D Theatre installations combine high-brightness active/passive 3D projection, silver-screen optics, multi-channel surround audio, and precision acoustic panelling.',
    applications: [
      'Active & Passive Stereoscopic 3D Projection',
      'High-Gain Silver Screen & Optical Calibration',
      'Immersive Multi-Channel Surround Audio',
      'Educational & Commercial 3D Screening Halls',
      'Custom Tiered Theatrical Seating',
      'Turnkey Acoustic & Lighting Integration',
    ],
    image: BSQUARE_IMAGES.theatre006,
  },
];

const INITIAL_PACKAGES: PackageItem[] = [
  {
    id: 'pkg-economic',
    name: 'ECONOMIC',
    price: '₹3–5',
    unit: 'Lakh',
    popular: false,
    features: [
      'Economic solutions without quality compromise',
      'Compact designs for small spaces',
      'Branded yet affordable audio-visual equipment',
      'Simple but elegant seating options',
      'Easy installation & maintenance',
    ],
  },
  {
    id: 'pkg-premium',
    name: 'PREMIUM',
    price: '₹5–9',
    unit: 'Lakh',
    popular: true,
    features: [
      'Modern interiors with premium seating',
      'Enhanced sound systems with acoustic panels',
      'Smart lighting & ambiance control',
      '4K projection systems for crystal-clear visuals',
      'Comfort-focused layouts with stylish aesthetics',
    ],
  },
  {
    id: 'pkg-luxury',
    name: 'LUXURY',
    price: '₹9–15',
    unit: 'Lakh',
    popular: false,
    features: [
      '4K projection & Dolby Atmos sound',
      'Luxury recliner seating with massage features',
      'High-end acoustic treatments for perfect sound',
      'Smart automation for lights, sound, and A/C',
      'Cinematic interiors for a true theatre feel',
    ],
  },
];

const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'Next-Gen Academic Smart Theatre Auditorium',
    location: 'Trivandrum, Kerala, India',
    shortDesc:
      'Turnkey transformation of a traditional institutional hall into an acoustic tiered Smart Theatre for interactive learning and conferences.',
    overview:
      'Engineered by BSquare Global to replace conventional classroom infrastructure with a cinema-grade academic presentation environment.',
    description:
      'This flagship Smart Theatre installation integrates wide-format high-lumen projection, custom fabric acoustic wall treatments, tiered ergonomic seating, digital podium automation, and crystal-clear speech & surround audio reproduction. Educators can switch seamlessly between lectures, video screenings, and interactive seminars with a single touch.',
    servicesProvided: [
      'Smart Theatre Design',
      'Acoustic Wall Panels',
      'Digital Podium & Interactive AV',
      'Tiered Auditorium Seating',
      'Smart Lighting Control',
    ],
    images: [
      BSQUARE_IMAGES.edu01,
      BSQUARE_IMAGES.edu02,
      BSQUARE_IMAGES.edu03,
      BSQUARE_IMAGES.smartClassroom,
    ],
    videoUrl: 'https://www.youtube.com/watch?v=HLkVH_mYAiw',
    featured: true,
  },
  {
    id: 'proj-2',
    title: 'Bespoke Dolby Atmos Luxury Home Cinema (Suite 003)',
    location: 'Kerala, India',
    shortDesc:
      'Private residential luxury cinema featuring 4K projection, Dolby Atmos 3D audio, motorized leather recliners, and fiber-optic starlight ceiling.',
    overview:
      'A Luxury-tier (₹9–15 Lakh class) residential home theatre crafted with bespoke acoustic geometry and warm architectural lighting.',
    description:
      'Designed from the ground up with room-within-a-room acoustic isolation, precision bass traps, diffusive wall panels, and warm cove lighting. Equipped with 4K Ultra-HD projection, immersive Dolby Atmos overhead and surround channels, and plush motorized recliners.',
    servicesProvided: [
      '4K Projection & Screen',
      'Dolby Atmos Sound System',
      'Luxury Recliner Seating',
      'Custom Acoustic Treatments',
      'Smart Scene Automation',
    ],
    images: [
      BSQUARE_IMAGES.theatre003,
      BSQUARE_IMAGES.theatre004,
      BSQUARE_IMAGES.theatre005,
    ],
    videoUrl: 'https://www.youtube.com/watch?v=HLkVH_mYAiw',
    featured: true,
  },
  {
    id: 'proj-3',
    title: 'Interactive Smart Classroom & Seminar Studio',
    location: 'Ajman / UAE & India Educational Hub',
    shortDesc:
      'Modern smart classroom transformation featuring dual-display visual systems, ceiling acoustics, and collaborative student seating.',
    overview:
      'Complete conversion from a traditional chalk-and-board room into a future-ready Smart Classroom and screening studio.',
    description:
      'Built to elevate student engagement and institutional prestige, this Smart Theatre classroom combines high-contrast projection, distributed ceiling speakers, acoustic wall cladding, and automated lighting scenes tailored for presentations, video screenings, and hybrid seminars.',
    servicesProvided: [
      'Classroom-to-Theatre Conversion',
      'Interactive Presentation System',
      'Distributed Audio Architecture',
      'Acoustic Ceiling & Wall Treatment',
    ],
    images: [
      BSQUARE_IMAGES.smartClassroom,
      BSQUARE_IMAGES.traditionalClassroom,
      BSQUARE_IMAGES.heroMain,
      BSQUARE_IMAGES.edu02,
    ],
    featured: true,
  },
  {
    id: 'proj-4',
    title: 'Signature Architectural Home Theatre (Series 006A)',
    location: 'Trivandrum, Kerala, India',
    shortDesc:
      'Premium residential screening room with geometric illuminated acoustic panels, tiered recliner platforms, and smart climate/lighting control.',
    overview:
      'A Premium-to-Luxury residential cinema showcasing BSquare Global’s signature architectural wall panelling and calibrated acoustics.',
    description:
      'Every surface in Series 006A is engineered for zero acoustic reflection and maximum visual drama. Integrated smart automation synchronizes the dimmable wall sconces, air conditioning, and 4K projection system the moment playback begins.',
    servicesProvided: [
      'Architectural Acoustic Panelling',
      '4K Cinema Projection',
      'Multi-Channel Surround Sound',
      'Smart Lighting & A/C Automation',
    ],
    images: [
      BSQUARE_IMAGES.theatre006A,
      BSQUARE_IMAGES.theatre006,
      BSQUARE_IMAGES.theatre007,
    ],
    videoUrl: 'https://www.youtube.com/watch?v=HLkVH_mYAiw',
    featured: true,
  },
  {
    id: 'proj-5',
    title: 'Immersive Stereoscopic 3D Experience Theatre',
    location: 'UAE & India Regional Installations',
    shortDesc:
      'High-impact 3D cinema installation with high-gain silver screen optics, stereoscopic projection, and multi-channel surround sound.',
    overview:
      'Turnkey 3D theatre engineered for educational institutions, science hubs, and entertainment destinations.',
    description:
      'Combines high-brightness dual stereoscopic projection, high-SPL surround sound, and tiered theatrical seating built with durable materials for continuous daily operation.',
    servicesProvided: [
      '3D Stereoscopic Projection',
      'High-Gain Optical Screen',
      'Surround Acoustic Engineering',
      'Tiered Theatre Seating',
    ],
    images: [
      BSQUARE_IMAGES.theatre007,
      BSQUARE_IMAGES.theatre008,
      BSQUARE_IMAGES.theatre009,
    ],
    featured: false,
  },
  {
    id: 'proj-6',
    title: 'Private Residence Cinema & Lounge Suite',
    location: 'Ajman, UAE',
    shortDesc:
      'Bespoke residential cinema integrating architectural lighting, acoustic wall cladding, climate zoning, and private lounge control.',
    overview:
      'Luxury residential theatre engineered by BSquare Global’s UAE & India integration team.',
    description:
      'Unifies lighting scenes, climate control, acoustic isolation, and 4K Dolby Atmos playback under a single intuitive touch interface.',
    servicesProvided: [
      'Home Theatre Integration',
      'Smart Lighting & HVAC Control',
      'Custom Acoustic Cladding',
      'Luxury Seating Layout',
    ],
    images: [
      BSQUARE_IMAGES.theatre005,
      BSQUARE_IMAGES.theatre009,
      BSQUARE_IMAGES.theatre004,
    ],
    featured: false,
  },
  {
    id: 'proj-7',
    title: 'Executive Auditorium & Smart Screening Hall',
    location: 'UAE & Kerala Campus',
    shortDesc:
      'Intelligent auditorium and training environment with automated AV switching, acoustic wall treatments, and high-lumen projection.',
    overview:
      'Designed to optimize institutional and corporate presentations with zero-clutter integrated technology.',
    description:
      'Features motorized projection screens, interactive displays, beamforming microphone arrays, and custom acoustic panelling that eliminates echo during conferences and screenings.',
    servicesProvided: [
      'Smart Theatre AV Architecture',
      'Auditorium Acoustics',
      'Automated Lighting & Shades',
      'Digital Presentation Systems',
    ],
    images: [
      BSQUARE_IMAGES.edu02,
      BSQUARE_IMAGES.edu01,
      BSQUARE_IMAGES.theatre008,
    ],
    featured: false,
  },
  {
    id: 'proj-8',
    title: 'Institutional Convention & Smart Theatre Hall',
    location: 'Kerala, India',
    shortDesc:
      'High-capacity institutional seminar and screening theatre equipped with stage lighting, line-array audio, and wide-screen projection.',
    overview:
      'Turns academic convocations, cultural screenings, and seminars into unforgettable immersive experiences.',
    description:
      'Engineered with durable commercial seating, high-output acoustic reinforcement, intelligent stage lighting, and multi-source presentation routing.',
    servicesProvided: [
      'Auditorium Acoustic Engineering',
      'Stage Lighting & Projection',
      'High-Output Sound Reinforcement',
      'Centralized AV Control Desk',
    ],
    images: [
      BSQUARE_IMAGES.edu03,
      BSQUARE_IMAGES.heroMain,
      BSQUARE_IMAGES.edu01,
    ],
    featured: false,
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Smart Theatre Podium & Interactive Presentation',
    caption: 'Turnkey Smart Theatre educational space with acoustic panelling and presenter console (edu01)',
    imageUrl: BSQUARE_IMAGES.edu01,
    aspect: 'wide',
    order: 1,
  },
  {
    id: 'gal-2',
    title: 'Bespoke Home Cinema Suite — Theatre 003',
    caption: 'Custom acoustic wall geometry, warm cove lighting, and cinema seating (theatre003)',
    imageUrl: BSQUARE_IMAGES.theatre003,
    aspect: 'tall',
    order: 2,
  },
  {
    id: 'gal-3',
    title: 'Smart Theatre Audience & Classroom View',
    caption: 'Immersive learning environment for seminars, conferences, and screenings (edu02)',
    imageUrl: BSQUARE_IMAGES.edu02,
    aspect: 'square',
    order: 3,
  },
  {
    id: 'gal-4',
    title: 'Luxury Residential Cinema — Theatre 004',
    caption: 'Dolby Atmos acoustic panelling with motorized luxury recliners (theatre004)',
    imageUrl: BSQUARE_IMAGES.theatre004,
    aspect: 'wide',
    order: 4,
  },
  {
    id: 'gal-5',
    title: 'Tiered Institutional Auditorium — Edu 03',
    caption: 'Large-format academic and event auditorium with precision acoustics (edu03)',
    imageUrl: BSQUARE_IMAGES.edu03,
    aspect: 'tall',
    order: 5,
  },
  {
    id: 'gal-6',
    title: 'Contemporary Smart Lounge Cinema — Theatre 005',
    caption: 'Integrated smart lighting, acoustic ceiling, and plush seating layout (theatre005)',
    imageUrl: BSQUARE_IMAGES.theatre005,
    aspect: 'square',
    order: 6,
  },
  {
    id: 'gal-7',
    title: 'Immersive 3D Cinema Environment — Theatre 006',
    caption: 'High-contrast acoustic interior and surround sound integration (theatre006)',
    imageUrl: BSQUARE_IMAGES.theatre006,
    aspect: 'wide',
    order: 7,
  },
  {
    id: 'gal-8',
    title: 'Architectural Cinema Series — Theatre 006A',
    caption: 'Backlit geometric acoustic wall panels and tiered recliner seating (theatre006A)',
    imageUrl: BSQUARE_IMAGES.theatre006A,
    aspect: 'tall',
    order: 8,
  },
  {
    id: 'gal-9',
    title: 'Precision Acoustic Screening Room — Theatre 007',
    caption: 'Custom diffusive and absorptive wall treatments with 4K projection (theatre007)',
    imageUrl: BSQUARE_IMAGES.theatre007,
    aspect: 'square',
    order: 9,
  },
  {
    id: 'gal-10',
    title: 'Automated Executive Theatre Suite — Theatre 008',
    caption: 'Smart automation for lights, sound, and climate in a modern theatre suite (theatre008)',
    imageUrl: BSQUARE_IMAGES.theatre008,
    aspect: 'wide',
    order: 10,
  },
  {
    id: 'gal-11',
    title: 'Flagship Private Cinema — Theatre 009',
    caption: 'Starry ceiling ambiance, luxury recliners, and calibrated surround audio (theatre009)',
    imageUrl: BSQUARE_IMAGES.theatre009,
    aspect: 'square',
    order: 11,
  },
  {
    id: 'gal-12',
    title: 'Next-Gen Smart Classroom Transformation',
    caption: 'Transformed Smart Classroom with interactive AV and theatre seating',
    imageUrl: BSQUARE_IMAGES.smartClassroom,
    aspect: 'wide',
    order: 12,
  },
];

const WORKFLOW_STEPS = [
  { num: '01', title: 'Enquiry Site', desc: 'Initial consultation and project requirement capture across India or UAE.' },
  { num: '02', title: 'Visit Site Measurements', desc: 'On-site acoustic, spatial, and electrical assessment by our engineers.' },
  { num: '03', title: 'Floor Plan For Client Approval', desc: 'Architectural 2D/3D seating, sightline, and speaker placement blueprint.' },
  { num: '04', title: 'Floor Plan For Client', desc: 'Finalized engineering schematics tailored to room acoustics and aesthetics.' },
  { num: '05', title: 'Floor Estimate Approval', desc: 'Transparent, itemized bill of materials and package pricing approval.' },
  { num: '06', title: 'Work Order Agreement', desc: 'Formal project timeline, milestone schedule, and quality SLA sign-off.' },
  { num: '07', title: 'Site Mobilization', desc: 'Acoustic fabrication, wiring, seating, and AV hardware installation.' },
  { num: '08', title: 'Advance Payment & Handover', desc: 'Final calibration, client training, and turnkey warranty activation.' },
];

const WHY_CHOOSE_ITEMS = [
  {
    num: '01',
    title: 'Durable Materials',
    desc: 'Built with long-lasting, high-quality materials for years of reliable performance.',
    icon: ShieldCheck,
  },
  {
    num: '02',
    title: 'Latest Technologies',
    desc: 'Experience cutting-edge audio-visual solutions for an immersive theatre feel.',
    icon: Cpu,
  },
  {
    num: '03',
    title: 'Transparent Pricing',
    desc: 'Clear, honest pricing with no hidden costs across Economic, Premium, and Luxury tiers.',
    icon: BadgeDollarSign,
  },
  {
    num: '04',
    title: 'Professional Team',
    desc: 'Expert designers and technicians ensure precision in every detail from acoustic modelling to automation.',
    icon: Users,
  },
  {
    num: '05',
    title: 'Premium Design',
    desc: 'Elegant, modern designs that enhance comfort and luxury for educational, residential, and commercial spaces.',
    icon: Sparkles,
  },
  {
    num: '06',
    title: 'Trusted Brands',
    desc: 'Only top-tier, certified technical brands for unmatched audio, visual, and automation quality.',
    icon: Award,
  },
];

const CLIENT_PORTFOLIO_BADGES = [
  { id: 'Client 20', name: 'Academic Institutions', region: 'Kerala & UAE' },
  { id: 'Client 19', name: 'Dolby Atmos Certified', region: 'Audio Partner' },
  { id: 'Client 18', name: '4K Laser Projection', region: 'Visual Partner' },
  { id: 'Client 17', name: 'Smart Theatre Control', region: 'Automation' },
  { id: 'Client 16', name: 'Acoustic Engineering', region: 'ISO Standard' },
  { id: 'Client 15', name: '3D Optical Systems', region: 'Stereoscopic AV' },
  { id: 'Client 14', name: 'Luxury Residences', region: 'Private Cinema' },
  { id: 'Client 13', name: 'Turnkey Theatres', region: 'India & UAE' },
];

// ============================================================================
// SAFE LOCALSTORAGE HELPERS
// ============================================================================

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors in sandboxed iframes
  }
}

// ============================================================================
// REUSABLE OBRY DESIGN COMPONENTS
// ============================================================================

/** Obry signature gold/bronze subtitle pill badge (#ba8a40) */
const ObryBadge: React.FC<{ children: React.ReactNode; icon?: string }> = ({
  children,
  icon,
}) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ba8a40] text-[#111314] text-xs font-extrabold uppercase tracking-[0.18em] shadow-sm">
    {icon && <span>{icon}</span>}
    <span>{children}</span>
  </div>
);

/** Obry curved underline SVG accent (#ba8a40) */
const ObryGoldArc: React.FC<{ className?: string }> = ({ className = 'w-36 h-3' }) => (
  <svg
    viewBox="0 0 200 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M3 14C55 3 145 3 197 14"
      stroke="#ba8a40"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
  </svg>
);

/** Image with automatic architectural SVG fallback so no broken image ever shows */
const SafeImage: React.FC<{
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
}> = ({ src, alt, className = '', fallbackLabel }) => {
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading="lazy"
      onError={() => setImgSrc(createArchitecturalFallback(fallbackLabel || alt))}
      className={className}
    />
  );
};

// ============================================================================
// MAIN APPLICATION COMPONENT
// ============================================================================

export default function App() {
  // Navigation / Page State (4 Public Pages + Discreet Admin)
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persisted CMS & Database State (v2 keys for 3 services & category-free projects/gallery)
  const [siteContent, setSiteContent] = useState<SiteContent>(() =>
    loadFromStorage('bsquare_site_content_v2', INITIAL_CONTENT)
  );
  const [services, setServices] = useState<ServiceItem[]>(() =>
    loadFromStorage('bsquare_services_v2', INITIAL_SERVICES)
  );
  const [packages, setPackages] = useState<PackageItem[]>(() =>
    loadFromStorage('bsquare_packages_v2', INITIAL_PACKAGES)
  );
  const [projects, setProjects] = useState<ProjectItem[]>(() =>
    loadFromStorage('bsquare_projects_v2', INITIAL_PROJECTS)
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    loadFromStorage('bsquare_gallery_v2', INITIAL_GALLERY)
  );
  const [enquiries, setEnquiries] = useState<EnquirySubmission[]>(() =>
    loadFromStorage('bsquare_enquiries_v2', [])
  );

  // Save state changes
  useEffect(() => {
    saveToStorage('bsquare_site_content_v2', siteContent);
  }, [siteContent]);
  useEffect(() => {
    saveToStorage('bsquare_services_v2', services);
  }, [services]);
  useEffect(() => {
    saveToStorage('bsquare_packages_v2', packages);
  }, [packages]);
  useEffect(() => {
    saveToStorage('bsquare_projects_v2', projects);
  }, [projects]);
  useEffect(() => {
    saveToStorage('bsquare_gallery_v2', gallery);
  }, [gallery]);
  useEffect(() => {
    saveToStorage('bsquare_enquiries_v2', enquiries);
  }, [enquiries]);

  // Interactive Homepage States
  const [heroSlideIndex, setHeroSlideIndex] = useState(0);
  const [activeAboutTab, setActiveAboutTab] = useState<
    'overview' | 'mission' | 'process' | 'locations'
  >('overview');
  const [expandedServiceId, setExpandedServiceId] = useState<string | null>('srv-1');
  const [activeSmartTheatreQ, setActiveSmartTheatreQ] = useState<number>(0);
  const [comparisonSlider, setComparisonSlider] = useState<number>(52);
  const [videoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [activeVideoUrl, setActiveVideoUrl] = useState<string>(
    'https://www.youtube.com/embed/HLkVH_mYAiw?autoplay=1'
  );

  // Projects Page States
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [projectModalImageIdx, setProjectModalImageIdx] = useState<number>(0);

  // Gallery Page States
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Contact Page Form States
  const [contactForm, setContactForm] = useState({
    name: '',
    mobile: '',
    email: '',
    country: 'India',
    service: 'Smart Theatre',
    location: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});
  const [submittedEnquiry, setSubmittedEnquiry] = useState<EnquirySubmission | null>(
    null
  );

  // Admin Dashboard States
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminEmailInput, setAdminEmailInput] = useState('');
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminTab, setAdminTab] = useState<
    'projects' | 'gallery' | 'content' | 'enquiries'
  >('projects');
  const [adminToast, setAdminToast] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [newProjectImageInput, setNewProjectImageInput] = useState('');
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'project' | 'gallery';
    id: string;
    title: string;
  } | null>(null);
  const [newGalleryForm, setNewGalleryForm] = useState<{
    title: string;
    caption: string;
    imageUrl: string;
    aspect: 'wide' | 'tall' | 'square';
  }>({
    title: '',
    caption: '',
    imageUrl: '',
    aspect: 'wide',
  });

  // Scroll listener for sticky transparent-to-solid header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock background body scroll when any modal is open so a second scrollbar never appears
  useEffect(() => {
    const anyModalOpen =
      selectedProject !== null ||
      lightboxIndex !== null ||
      videoModalOpen ||
      searchModalOpen ||
      deleteConfirmTarget !== null;
    if (anyModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [
    selectedProject,
    lightboxIndex,
    videoModalOpen,
    searchModalOpen,
    deleteConfirmTarget,
  ]);

  // Navigate helper
  const navigateTo = (page: PageRoute, prefillService?: string) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    if (prefillService) {
      setContactForm((prev) => ({ ...prev, service: prefillService }));
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showToast = (msg: string) => {
    setAdminToast(msg);
    setTimeout(() => {
      setAdminToast(null);
    }, 3500);
  };

  // EXACTLY 3 Full-Width Hero Slides with Push-Left Smooth Transitions (Refer: bsquareglobal.com)
  const heroSlides = [
    {
      title: 'SMART THEATRE',
      subtitle:
        'Build a revolutionary education space for learning, seminars, presentations, conferences, and video screening.',
      image: siteContent.heroSlide1Image || BSQUARE_IMAGES.heroMain,
      tag: '01 • SMART THEATRE',
    },
    {
      title: 'HOME THEATRE',
      subtitle:
        'Custom-engineered luxury domestic cinemas with 4K projection, Dolby Atmos acoustics, and bespoke seating.',
      image: siteContent.heroSlide2Image || BSQUARE_IMAGES.theatre003,
      tag: '02 • HOME THEATRE',
    },
    {
      title: '3D THEATRE',
      subtitle:
        'Immersive stereoscopic 3D cinema environments engineered for educational institutions and commercial venues.',
      image: siteContent.heroSlide3Image || BSQUARE_IMAGES.theatre006,
      tag: '03 • 3D THEATRE',
    },
  ];

  // Auto-advance hero slide with push-left transition
  useEffect(() => {
    if (currentPage !== 'home') return;
    const timer = setInterval(() => {
      setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [currentPage, heroSlides.length]);

  // Ordered Gallery (Categories Removed)
  const sortedGallery = useMemo(() => {
    return [...gallery].sort((a, b) => a.order - b.order);
  }, [gallery]);

  // Keyboard navigation for Lightbox & Project Modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (e.key === 'ArrowRight') {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % sortedGallery.length : null
          );
        } else if (e.key === 'ArrowLeft') {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + sortedGallery.length) % sortedGallery.length
              : null
          );
        } else if (e.key === 'Escape') {
          setLightboxIndex(null);
        }
      } else if (selectedProject !== null && e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, sortedGallery.length, selectedProject]);

  // Contact Form Validation & Submission
  const validateAndSubmitEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!contactForm.name.trim()) errs.name = 'Please enter your full name.';
    if (!contactForm.mobile.trim() || contactForm.mobile.trim().length < 7) {
      errs.mobile = 'Please enter a valid mobile / WhatsApp number.';
    }
    if (
      !contactForm.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email.trim())
    ) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!contactForm.location.trim()) {
      errs.location = 'Please specify your project city/location.';
    }
    if (!contactForm.message.trim()) {
      errs.message = 'Please share a brief overview of your project requirements.';
    }
    setContactErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newRecord: EnquirySubmission = {
      id: `ENQ-${Date.now().toString().slice(-6)}`,
      ...contactForm,
      createdAt: new Date().toLocaleString(),
    };
    setEnquiries((prev) => [newRecord, ...prev]);
    setSubmittedEnquiry(newRecord);
  };

  // Build WhatsApp URL with prefilled message
  const getWhatsAppUrl = (customText?: string) => {
    const cleanPhone = siteContent.whatsappNumber.replace(/[^0-9]/g, '');
    const msg =
      customText ||
      `Hello BSquare Global Team, I would like to discuss a project inquiry regarding Smart Theatre, Home Theatre, or 3D Theatre solutions.`;
    return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
  };

  // File upload helper (converts user file to Base64 data URI for Admin uploads)
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onLoaded: (dataUri: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onLoaded(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Global Search Results
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return { matchingProjects: [], matchingServices: [] };
    return {
      matchingProjects: projects.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q) ||
          p.shortDesc.toLowerCase().includes(q)
      ),
      matchingServices: services.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.shortDesc.toLowerCase().includes(q)
      ),
    };
  }, [searchQuery, projects, services]);

  const getServiceIcon = (name: ServiceCategory) => {
    switch (name) {
      case 'Smart Theatre':
        return MonitorPlay;
      case 'Home Theatre':
        return Film;
      case '3D Theatre':
        return Compass;
      default:
        return Layers;
    }
  };

  return (
    <div className="min-h-screen bg-[#151819] text-white font-sans selection:bg-[#ba8a40] selection:text-[#111314] overflow-x-hidden">
      {/* Inject Exact Obry Reference Typography & Custom Keyframe Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Syne:wght@700;800&family=Unbounded:wght@600;700;800;900&display=swap');

        .font-obry-display {
          font-family: 'Unbounded', 'Syne', sans-serif;
        }
        .font-obry-syne {
          font-family: 'Syne', 'Unbounded', sans-serif;
        }
        .font-obry-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        @keyframes obryMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-obry-marquee {
          display: flex;
          width: max-content;
          animation: obryMarquee 28s linear infinite;
        }
        .animate-obry-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* =====================================================================
          TOP ANNOUNCEMENT / REGIONAL PRESENCE BAR (INDIA & UAE)
      ===================================================================== */}
      <div className="bg-[#111314] border-b border-[#2A2E30] text-xs text-[#A1A1A1] py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-white font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ba8a40] animate-pulse" />
              INDIA &amp; UAE OPERATIONS
            </span>
            <span className="hidden md:inline text-[#2A2E30]">|</span>
            <span className="hidden md:inline-flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#ba8a40]" />
              India: Trivandrum, Kerala &bull; UAE: Ajman
            </span>
          </div>
          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`mailto:${siteContent.email}`}
              className="hover:text-[#ba8a40] transition-colors inline-flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5 text-[#ba8a40]" />
              <span>{siteContent.email}</span>
            </a>
            <span className="text-[#2A2E30]">|</span>
            <a
              href={`tel:${siteContent.phoneUae.replace(/\s+/g, '')}`}
              className="hover:text-[#ba8a40] transition-colors hidden sm:inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#ba8a40]" />
              <span>{siteContent.phoneUae}</span>
            </a>
            <a
              href={`tel:${siteContent.phoneIndia.replace(/\s+/g, '')}`}
              className="hover:text-[#ba8a40] transition-colors inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#ba8a40]" />
              <span>{siteContent.phoneIndia}</span>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================================
          STICKY HEADER (OBRY EXACT HEADER LAYOUT & SCROLL TRANSITION)
      ===================================================================== */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled || currentPage !== 'home'
            ? 'bg-[#151819]/95 backdrop-blur-md border-b border-[#2A2E30] py-3.5 shadow-2xl'
            : 'bg-[#151819]/70 backdrop-blur-sm border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: BSquare Global Transparent Logo (LOGO-02.png) */}
          <button
            type="button"
            onClick={() => navigateTo('home')}
            className="flex items-center text-left group focus:outline-none bg-transparent"
          >
            <SafeImage
              src={BSQUARE_IMAGES.logo}
              alt="BSquare Global Logo"
              fallbackLabel="BSQUARE GLOBAL"
              className="h-11 sm:h-12 w-auto object-contain bg-transparent transition-transform group-hover:scale-[1.02]"
            />
          </button>

          {/* Centre: Exactly Four Main Navigation Pages (Obry Active Gold Arc Style) */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-9"
          >
            {(
              [
                { id: 'home', label: 'HOME', path: '/' },
                { id: 'projects', label: 'PROJECTS', path: '/projects' },
                { id: 'gallery', label: 'GALLERY', path: '/gallery' },
                { id: 'contact', label: 'CONTACT', path: '/contact' },
              ] as { id: PageRoute; label: string; path: string }[]
            ).map((item) => {
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`relative py-2 text-xs font-extrabold uppercase tracking-[0.18em] transition-colors ${
                    active
                      ? 'text-[#ba8a40]'
                      : 'text-white hover:text-[#ba8a40]'
                  }`}
                >
                  <span>{item.label}</span>
                  {active && (
                    <span className="absolute bottom-0 left-0 right-0 flex justify-center">
                      <svg
                        viewBox="0 0 60 8"
                        className="w-11 h-2"
                        fill="none"
                      >
                        <path
                          d="M2 6C18 1.5 42 1.5 58 6"
                          stroke="#ba8a40"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Side: Obry Search Button + Divider + Gold Pill WhatsApp Button */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={() => setSearchModalOpen(true)}
              aria-label="Search Projects and Services"
              className="w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] text-white hover:text-[#ba8a40] flex items-center justify-center transition-all"
            >
              <Search className="w-4 h-4" />
            </button>

            <div className="hidden sm:block h-6 w-[1px] bg-[#2A2E30]" />

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-lg shadow-[#ba8a40]/10"
            >
              <MessageCircle className="w-4 h-4 fill-[#111314]" />
              <span className="hidden sm:inline">WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Menu"
              className="lg:hidden w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] text-white flex items-center justify-center"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#ba8a40]" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#111314] border-b border-[#2A2E30] px-6 py-6 space-y-5">
            <div className="flex flex-col space-y-2">
              {(
                [
                  { id: 'home', label: '01. Home', sub: '/' },
                  { id: 'projects', label: '02. Projects', sub: '/projects' },
                  { id: 'gallery', label: '03. Gallery', sub: '/gallery' },
                  { id: 'contact', label: '04. Contact', sub: '/contact' },
                ] as { id: PageRoute; label: string; sub: string }[]
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-left font-obry-display text-sm uppercase tracking-wider transition-all ${
                    currentPage === item.id
                      ? 'bg-[#ba8a40] text-[#111314] font-extrabold'
                      : 'bg-[#191C1D] text-white hover:bg-[#222628]'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-xs opacity-70">{item.sub}</span>
                </button>
              ))}
            </div>
            <div className="pt-3 border-t border-[#2A2E30] flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (+91 97447 14449)</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* =====================================================================
          PAGE 1: HOME PAGE (/) — EXACT OBRY SECTION SEQUENCE & STYLING
      ===================================================================== */}
      {currentPage === 'home' && (
        <main>
          {/* -----------------------------------------------------------------
              4A. FULL-WIDTH HERO BANNER SLIDER — 3 IMAGES WITH PUSH-LEFT SMOOTH TRANSITIONS
              (Refer: https://bsquareglobal.com/)
          ----------------------------------------------------------------- */}
          <section className="relative w-full min-h-[620px] lg:h-[86vh] overflow-hidden bg-[#111314]">
            {/* Full-Width 3-Image Horizontal Track with Push-Left Smooth Transition (0% Dark on Non-Lettering Area) */}
            <div
              className="flex w-full h-full min-h-[620px] lg:h-[86vh] transition-transform duration-1000 ease-in-out"
              style={{ transform: `translateX(-${heroSlideIndex * 100}%)` }}
            >
              {heroSlides.map((slide) => (
                <div
                  key={slide.title}
                  className="w-full shrink-0 relative min-h-[620px] lg:h-[86vh] overflow-hidden"
                >
                  <SafeImage
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover object-center transition-transform duration-1000"
                  />
                </div>
              ))}
            </div>

            {/* Foreground Hero Content Overlay — Darkened ONLY Directly Under the Lettering Area */}
            <div className="absolute inset-0 z-10 flex items-center pointer-events-none">
              <div className="max-w-7xl mx-auto w-full px-4 sm:px-8 py-12">
                <div className="relative max-w-2xl p-6 sm:p-10 rounded-[32px] pointer-events-auto">
                  {/* Localized Soft Dark Backdrop Strictly Behind the Lettering */}
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-[40px] -z-10"
                    style={{
                      background:
                        'radial-gradient(ellipse at 42% 50%, rgba(17,19,20,0.82) 0%, rgba(17,19,20,0.58) 55%, rgba(17,19,20,0) 100%)',
                    }}
                  />

                  <div className="space-y-6">
                    {/* Main Headline */}
                    <div>
                      <h1 className="font-obry-display text-3xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-[1.12] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">
                        {siteContent.heroHeadline.includes('Creating Experiences') ? (
                          <>
                            Transforming Spaces.{' '}
                            <span className="text-[#ba8a40] inline-block relative">
                              Creating Experiences.
                              <ObryGoldArc className="w-full h-3 mt-1" />
                            </span>
                          </>
                        ) : (
                          siteContent.heroHeadline
                        )}
                      </h1>
                    </div>

                    {/* Supporting Text */}
                    <p className="text-base sm:text-lg text-white max-w-xl leading-relaxed font-medium drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
                      {siteContent.heroSubheadline}
                    </p>

                    {/* 3 Core Services Pill Strip */}
                    <div className="flex flex-wrap items-center gap-2.5 pt-1">
                      {(['Smart Theatre', 'Home Theatre', '3D Theatre'] as const).map(
                        (srvName, idx) => (
                          <button
                            key={srvName}
                            type="button"
                            onClick={() => setHeroSlideIndex(idx)}
                            className={`px-4 py-1.5 rounded-full font-obry-display text-xs font-bold uppercase tracking-wider border transition-all ${
                              heroSlideIndex === idx
                                ? 'bg-[#ba8a40] text-[#111314] border-[#ba8a40]'
                                : 'bg-[#111314]/85 text-white border-[#2A2E30] hover:border-[#ba8a40]'
                            }`}
                          >
                            {srvName}
                          </button>
                        )
                      )}
                    </div>

                    {/* Hero CTA Buttons */}
                    <div className="flex flex-wrap items-center gap-4 pt-2">
                      <button
                        type="button"
                        onClick={() => navigateTo('projects')}
                        className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] font-obry-display text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all transform hover:-translate-y-0.5 shadow-xl shadow-[#ba8a40]/20"
                      >
                        <span>Explore Projects</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => navigateTo('contact')}
                        className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-[#111314]/90 hover:bg-[#232729] text-white border border-[#ba8a40]/70 hover:border-[#ba8a40] font-obry-display text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all"
                      >
                        <span>Contact Us</span>
                        <ArrowUpRight className="w-4 h-4 text-[#ba8a40]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width Slider Prev / Next & Slide Progress Indicators */}
            <div className="absolute bottom-6 right-4 sm:right-8 z-20 flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  setHeroSlideIndex(
                    (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
                  )
                }
                aria-label="Previous Hero Slide"
                className="w-11 h-11 rounded-full bg-[#111314]/85 hover:bg-[#ba8a40] text-white hover:text-[#111314] border border-[#ba8a40]/50 flex items-center justify-center transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[#111314]/85 border border-[#2A2E30]">
                {heroSlides.map((s, idx) => (
                  <button
                    key={s.title}
                    type="button"
                    onClick={() => setHeroSlideIndex(idx)}
                    aria-label={`Slide ${idx + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      heroSlideIndex === idx
                        ? 'w-8 bg-[#ba8a40]'
                        : 'w-2.5 bg-white/35 hover:bg-white/60'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() =>
                  setHeroSlideIndex((prev) => (prev + 1) % heroSlides.length)
                }
                aria-label="Next Hero Slide"
                className="w-11 h-11 rounded-full bg-[#111314]/85 hover:bg-[#ba8a40] text-white hover:text-[#111314] border border-[#ba8a40]/50 flex items-center justify-center transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              OBRY INFINITE MARQUEE BANNER (3 SERVICES: SMART, HOME, 3D THEATRE)
          ----------------------------------------------------------------- */}
          <div className="bg-[#ba8a40] text-[#111314] py-4 border-y border-[#111314]/20 overflow-hidden">
            <div className="animate-obry-marquee flex items-center gap-8 font-obry-display text-sm sm:text-base font-extrabold uppercase tracking-[0.16em]">
              {[...Array(3)].map((_, idx) => (
                <React.Fragment key={idx}>
                  <span>SMART THEATRE</span>
                  <span>✳</span>
                  <span>HOME THEATRE</span>
                  <span>✳</span>
                  <span>3D THEATRE</span>
                  <span>✳</span>
                  <span>UAE &amp; INDIA</span>
                  <span>✳</span>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* -----------------------------------------------------------------
              4B. COMPANY INTRODUCTION ("Technology That Transforms Experiences.")
              OBRY TABBED ABOUT LAYOUT + PREMIUM IMAGE & TEXT
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#111314] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              {/* Top Heading & Full-Width Horizontal Pill Tab Bar Below (Desktop & Mobile) */}
              <div className="flex flex-col items-start gap-8 mb-12">
                <div className="space-y-4 max-w-3xl">
                  <ObryBadge icon="👋">ABOUT BSQUARE GLOBAL</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {siteContent.introHeading}
                  </h2>
                  <ObryGoldArc />
                </div>

                {/* Full-Width Horizontal Pill Tab Bar (Matches Attached Reference View on Desktop) */}
                <div className="w-full flex flex-wrap items-center gap-2 sm:gap-4 md:gap-6 bg-[#191C1D] p-2.5 rounded-2xl sm:rounded-full border border-[#2A2E30]">
                  {(
                    [
                      { id: 'overview', label: 'COMPANY OVERVIEW' },
                      { id: 'mission', label: 'OUR MISSION' },
                      { id: 'process', label: '8-STEP PROCESS' },
                      { id: 'locations', label: 'UAE & INDIA HUB' },
                    ] as const
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveAboutTab(tab.id)}
                      className={`px-5 sm:px-6 py-3 rounded-full font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all ${
                        activeAboutTab === tab.id
                          ? 'bg-[#ba8a40] text-[#111314] shadow-md'
                          : 'bg-transparent text-[#A1A1A1] hover:text-white border border-transparent hover:border-[#ba8a40]/40'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Split Image-and-Text Content Card (Obry Rounded Container) */}
              <div className="rounded-[28px] bg-[#191C1D] border border-[#2A2E30] p-6 sm:p-10 lg:p-12">
                {activeAboutTab === 'overview' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-6 space-y-6">
                      <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ba8a40]">
                        <span>PIONEERING SMART ENVIRONMENTS</span>
                      </div>
                      <h3 className="font-obry-display text-2xl sm:text-3xl font-bold text-white leading-snug">
                        Delivering Smart Theatre, Home Theatre &amp; 3D Theatre Environments
                      </h3>
                      <p className="text-[#A1A1A1] leading-relaxed text-base">
                        {siteContent.introText}
                      </p>
                      <p className="text-[#A1A1A1] leading-relaxed text-base">
                        {siteContent.missionText}
                      </p>
                      <div className="grid grid-cols-3 gap-4 pt-2">
                        <div className="p-4 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <div className="font-obry-display text-2xl sm:text-3xl font-extrabold text-[#ba8a40]">
                            03
                          </div>
                          <div className="text-xs text-[#A1A1A1] mt-1 font-medium">
                            Core Theatre Verticals
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <div className="font-obry-display text-2xl sm:text-3xl font-extrabold text-[#ba8a40]">
                            02
                          </div>
                          <div className="text-xs text-[#A1A1A1] mt-1 font-medium">
                            International Hubs (UAE &amp; India)
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <div className="font-obry-display text-2xl sm:text-3xl font-extrabold text-[#ba8a40]">
                            100%
                          </div>
                          <div className="text-xs text-[#A1A1A1] mt-1 font-medium">
                            Turnkey Acoustic &amp; AV Delivery
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                      <div className="space-y-4">
                        <div className="rounded-2xl overflow-hidden border border-[#2A2E30] h-52 sm:h-64">
                          <SafeImage
                            src={siteContent.aboutImage1 || BSQUARE_IMAGES.edu01}
                            alt="BSquare Global Smart Theatre"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-5 rounded-2xl bg-[#ba8a40] text-[#111314]">
                          <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider">
                            TURNKEY SOLUTIONS
                          </div>
                          <p className="text-xs font-semibold mt-1 leading-relaxed">
                            From acoustic modelling &amp; seating to 4K Dolby Atmos calibration.
                          </p>
                        </div>
                      </div>
                      <div className="space-y-4 pt-6">
                        <div className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                            DUAL-REGION SUPPORT
                          </div>
                          <p className="text-xs text-[#A1A1A1] mt-1 leading-relaxed">
                            Head office in Ajman, UAE &amp; development centre in Trivandrum, Kerala.
                          </p>
                        </div>
                        <div className="rounded-2xl overflow-hidden border border-[#2A2E30] h-52 sm:h-64">
                          <SafeImage
                            src={siteContent.aboutImage2 || BSQUARE_IMAGES.theatre004}
                            alt="BSquare Global Luxury Home Cinema"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeAboutTab === 'mission' && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                    <div className="lg:col-span-7 space-y-6">
                      <ObryBadge>OUR MISSION &amp; VISION</ObryBadge>
                      <h3 className="font-obry-display text-2xl sm:text-3xl font-bold text-white">
                        Revolutionizing Infrastructure Through Intelligent AV &amp; Theatre Engineering
                      </h3>
                      <blockquote className="p-6 rounded-2xl bg-[#151819] border-l-4 border-[#ba8a40] text-white text-base sm:text-lg leading-relaxed">
                        &ldquo;{siteContent.missionText}&rdquo;
                      </blockquote>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <h4 className="font-obry-display text-sm font-bold text-[#ba8a40] uppercase">
                            Educational Transformation
                          </h4>
                          <p className="text-xs text-[#A1A1A1] mt-2 leading-relaxed">
                            Empowering schools, colleges, and universities to evolve traditional classrooms into immersive Smart Theatres.
                          </p>
                        </div>
                        <div className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                          <h4 className="font-obry-display text-sm font-bold text-[#ba8a40] uppercase">
                            Home &amp; 3D Cinema Excellence
                          </h4>
                          <p className="text-xs text-[#A1A1A1] mt-2 leading-relaxed">
                            Custom-engineered private home cinemas and stereoscopic 3D theatres tailored to every space and budget.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-5">
                      <div className="rounded-2xl overflow-hidden border border-[#2A2E30] h-80">
                        <SafeImage
                          src={siteContent.missionImage || BSQUARE_IMAGES.edu03}
                          alt="BSquare Global Mission"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {activeAboutTab === 'process' && (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-[#ba8a40]">
                          HOW OUR ORGANIZATION WORKS
                        </span>
                        <h3 className="font-obry-display text-2xl font-bold text-white mt-1">
                          Our 8-Step Turnkey Project Execution Process
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => navigateTo('contact')}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider"
                      >
                        <span>Start Step 01</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      {WORKFLOW_STEPS.map((step) => (
                        <div
                          key={step.num}
                          className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30] hover:border-[#ba8a40] transition-all"
                        >
                          <div className="font-obry-display text-xl font-extrabold text-[#ba8a40]">
                            STEP {step.num}.
                          </div>
                          <h4 className="font-obry-display text-sm font-bold text-white mt-2">
                            {step.title}
                          </h4>
                          <p className="text-xs text-[#A1A1A1] mt-1.5 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeAboutTab === 'locations' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-[#151819] border border-[#2A2E30] space-y-4">
                      <span className="px-3 py-1 rounded-full bg-[#ba8a40]/15 text-[#ba8a40] text-xs font-bold uppercase tracking-wider">
                        INDIA OPERATIONS &amp; DEVELOPMENT CENTRE
                      </span>
                      <h3 className="font-obry-display text-xl font-bold text-white">
                        Trivandrum, Kerala, India
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">{siteContent.indiaAddress}</p>
                      <div className="text-sm text-[#ba8a40] font-semibold">
                        Phone: {siteContent.phoneIndia} | WhatsApp: +{siteContent.whatsappNumber}
                      </div>
                    </div>
                    <div className="p-6 rounded-2xl bg-[#151819] border border-[#2A2E30] space-y-4">
                      <span className="px-3 py-1 rounded-full bg-[#ba8a40]/15 text-[#ba8a40] text-xs font-bold uppercase tracking-wider">
                        UAE HEAD OFFICE
                      </span>
                      <h3 className="font-obry-display text-xl font-bold text-white">
                        Ajman, United Arab Emirates
                      </h3>
                      <p className="text-sm text-[#A1A1A1]">{siteContent.uaeAddress}</p>
                      <div className="text-sm text-[#ba8a40] font-semibold">
                        Phone: {siteContent.phoneUae} / {siteContent.phoneUaeSecondary}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4C. OUR EXPERTISE — EXACTLY 3 SERVICES (Smart Theatre, Home Theatre, 3D Theatre)
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#151819] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div className="space-y-4">
                  <ObryBadge icon="✳">OUR EXPERTISE</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    Our Core Theatre Solutions
                  </h2>
                  <ObryGoldArc />
                </div>
                <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md">
                  Specialized turnkey engineering across Smart Theatre, Home Theatre, and 3D Theatre environments.
                </p>
              </div>

              {/* 3 Services Visual Grid (Obry SERVICE 01–03 Cards — Specs Always Visible) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => {
                  const IconComp = getServiceIcon(service.name);
                  return (
                    <div
                      key={service.id}
                      className="rounded-[24px] bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] shadow-xl transition-all duration-300 overflow-hidden flex flex-col"
                    >
                      {/* Top Header: Icon + SERVICE 01. */}
                      <div className="p-6 pb-4 flex items-center justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-[#151819] border border-[#ba8a40]/40 flex items-center justify-center text-[#ba8a40]">
                          <IconComp className="w-6 h-6" />
                        </div>
                        <span className="font-obry-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba8a40]">
                          SERVICE {service.number}.
                        </span>
                      </div>

                      {/* Service Photograph */}
                      <div className="px-6">
                        <div className="relative h-52 rounded-2xl overflow-hidden border border-[#2A2E30]">
                          <SafeImage
                            src={service.image}
                            alt={service.name}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#111314]/80 via-transparent to-transparent" />
                        </div>
                      </div>

                      {/* Service Title, Description & Always-On Specs */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                        <div className="space-y-4">
                          <div className="space-y-2.5">
                            <h3 className="font-obry-display text-xl font-bold text-white">
                              {service.name}
                            </h3>
                            <p className="text-sm text-[#A1A1A1] leading-relaxed">
                              {service.shortDesc}
                            </p>
                          </div>

                          {/* Always-Visible Specs & Key Capabilities */}
                          <div className="pt-4 border-t border-[#2A2E30] space-y-3">
                            <p className="text-xs text-white/90 leading-relaxed">
                              {service.details}
                            </p>
                            <div className="space-y-2">
                              <div className="text-[11px] font-bold uppercase tracking-wider text-[#ba8a40]">
                                Specifications &amp; Capabilities:
                              </div>
                              <ul className="grid grid-cols-1 gap-1.5">
                                {service.applications.map((app) => (
                                  <li
                                    key={app}
                                    className="flex items-center gap-2 text-xs text-[#A1A1A1]"
                                  >
                                    <Check className="w-3.5 h-3.5 text-[#ba8a40] shrink-0" />
                                    <span>{app}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>

                        {/* Card Footer: Direct Enquiry */}
                        <div className="pt-4 border-t border-[#2A2E30] flex items-center justify-end">
                          <button
                            type="button"
                            onClick={() => navigateTo('contact', service.name)}
                            className="text-xs font-bold uppercase tracking-wider text-[#ba8a40] hover:underline inline-flex items-center gap-1"
                          >
                            <span>Enquire</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4D. SMART THEATRE FEATURE ("Transforming Classrooms into Smart Theatres.")
              + BEFORE/AFTER CLASSROOM SLIDER + 01/02/03 CONTENT + VIDEO SHOWCASE
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#111314] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
              {/* Top Heading */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                <div className="lg:col-span-7 space-y-4">
                  <ObryBadge icon="🎓">FLAGSHIP SMART THEATRE SOLUTION</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {siteContent.smartTheatreHeading}
                  </h2>
                  <ObryGoldArc />
                </div>
                <div className="lg:col-span-5">
                  <p className="text-base text-[#A1A1A1] leading-relaxed">
                    {siteContent.smartTheatreSubheading}
                  </p>
                </div>
              </div>

              {/* Full-Section-Width Interactive Before/After Classroom Comparison + 01/02/03 Below */}
              <div className="space-y-10">
                {/* Full-Section-Width Traditional Classroom vs Smart Classroom Slider */}
                <div className="w-full space-y-4">
                  <div className="relative w-full h-[380px] sm:h-[520px] lg:h-[620px] rounded-[28px] overflow-hidden border-2 border-[#ba8a40]/50 select-none bg-[#191C1D] shadow-2xl">
                    {/* Base Layer: Smart Classroom (After) */}
                    <SafeImage
                      src={siteContent.smartClassroomImage || BSQUARE_IMAGES.smartClassroom}
                      alt="Smart Classroom by BSquare Global"
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-5 right-5 z-20 px-4 py-2 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider shadow-lg">
                      SMART CLASSROOM
                    </span>

                    {/* Clipped Layer: Traditional Classroom (Before) */}
                    <div
                      className="absolute inset-0 overflow-hidden"
                      style={{ clipPath: `inset(0 ${100 - comparisonSlider}% 0 0)` }}
                    >
                      <SafeImage
                        src={siteContent.traditionalClassroomImage || BSQUARE_IMAGES.traditionalClassroom}
                        alt="Traditional Classroom"
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute top-5 left-5 z-20 px-4 py-2 rounded-full bg-[#111314]/90 text-white border border-[#2A2E30] font-obry-display text-xs font-extrabold uppercase tracking-wider shadow-lg">
                        TRADITIONAL CLASSROOM
                      </span>
                    </div>

                    {/* Vertical Divider Handle */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-[#ba8a40] z-20 pointer-events-none"
                      style={{ left: `${comparisonSlider}%` }}
                    >
                      <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#ba8a40] text-[#111314] flex items-center justify-center shadow-2xl border-2 border-[#111314]">
                        <SlidersHorizontal className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Interactive Range Input Overlay */}
                    <input
                      type="range"
                      min={5}
                      max={95}
                      value={comparisonSlider}
                      onChange={(e) => setComparisonSlider(Number(e.target.value))}
                      aria-label="Compare Traditional Classroom and Smart Classroom"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs sm:text-sm text-[#A1A1A1] px-2">
                    <span>&larr; Drag slider across the full-width view to compare Traditional Classroom vs. Smart Classroom</span>
                    <span className="text-[#ba8a40] font-bold">
                      {comparisonSlider}% Comparison View
                    </span>
                  </div>
                </div>

                {/* Below Comparison Image: 01 What, 02 Why, 03 Benefits of Smart Theatre */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {[
                    {
                      num: '01',
                      q: 'What is the Smart Theatre?',
                      a: 'Smart Theatre is an advanced educational space designed with state-of-the-art audio-visual systems, interactive tools, and immersive technology. It transforms traditional classrooms into dynamic environments, making learning more engaging, memorable, and impactful for students, educators, and professionals across diverse academic and training needs.',
                    },
                    {
                      num: '02',
                      q: 'Why Choose Smart Theatre?',
                      a: 'Choosing Smart Theatre means embracing the future of education. It offers immersive visuals, crystal-clear sound, and smart automation that simplify teaching and presentations. Flexible for seminars, conferences, and screenings, it creates an engaging, professional, and modern environment that improves communication, participation, and overall knowledge-sharing experiences.',
                    },
                    {
                      num: '03',
                      q: 'What Are the Benefits of Smart Theatre?',
                      a: "Smart Theatre empowers educational institutes to grow into next-generation learning spaces. By adopting modern audio-visual technology, institutes can attract students, host advanced seminars, and provide impactful learning experiences. This transformation not only enhances teaching quality but also strengthens the institute's reputation as a forward-thinking, future-ready education hub.",
                    },
                  ].map((item, idx) => {
                    const open = activeSmartTheatreQ === idx;
                    return (
                      <div
                        key={item.num}
                        onClick={() => setActiveSmartTheatreQ(idx)}
                        className={`p-7 rounded-[24px] border transition-all cursor-pointer flex flex-col justify-between ${
                          open
                            ? 'bg-[#191C1D] border-[#ba8a40] shadow-xl shadow-[#ba8a40]/10'
                            : 'bg-[#191C1D]/80 border-[#2A2E30] hover:border-[#ba8a40]/60'
                        }`}
                      >
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="font-obry-display text-3xl font-extrabold text-[#ba8a40]">
                              {item.num}
                            </span>
                            <span className="px-3 py-1 rounded-full bg-[#151819] border border-[#ba8a40]/40 text-[10px] font-obry-display font-bold uppercase tracking-widest text-[#ba8a40]">
                              SMART THEATRE
                            </span>
                          </div>
                          <h3 className="font-obry-display text-lg sm:text-xl font-bold text-white">
                            {item.q}
                          </h3>
                          <p className="text-sm text-[#A1A1A1] leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* 6 Required Smart Theatre Applications + Original Smart Theatre Photography Trio */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {[
                  { label: 'Educational Presentations', icon: MonitorPlay },
                  { label: 'Seminars', icon: Users },
                  { label: 'Conferences', icon: Globe },
                  { label: 'Video Screenings', icon: Film },
                  { label: 'Interactive Learning', icon: Sparkles },
                  { label: 'Professional AV Systems', icon: Volume2 },
                ].map((app) => {
                  const Icon = app.icon;
                  return (
                    <div
                      key={app.label}
                      className="p-4 rounded-2xl bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] transition-all text-center space-y-2.5"
                    >
                      <div className="w-10 h-10 mx-auto rounded-xl bg-[#151819] border border-[#ba8a40]/40 flex items-center justify-center text-[#ba8a40]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="font-obry-display text-xs font-bold text-white leading-snug">
                        {app.label}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Original Smart Theatre Photos (edu01, edu02, edu03) + Obry Video Showcase Banner */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#2A2E30] relative group h-64">
                  <SafeImage
                    src={siteContent.smartTheatrePhoto1 || BSQUARE_IMAGES.edu01}
                    alt="Smart Theatre Podium Presentation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111314] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ba8a40]">
                      SMART PODIUM &amp; AV
                    </span>
                    <h4 className="font-obry-display text-sm font-bold text-white">
                      Interactive Lecture &amp; Seminar Stage
                    </h4>
                  </div>
                </div>

                <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-[#2A2E30] relative group h-64">
                  <SafeImage
                    src={siteContent.smartTheatrePhoto2 || BSQUARE_IMAGES.edu02}
                    alt="Smart Theatre Classroom Audience"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111314] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#ba8a40]">
                      IMMERSIVE LEARNING
                    </span>
                    <h4 className="font-obry-display text-sm font-bold text-white">
                      Acoustic Classroom &amp; Screening Seating
                    </h4>
                  </div>
                </div>

                {/* Obry Video Showcase Card with Pulsing Play Button */}
                <div className="lg:col-span-4 rounded-2xl overflow-hidden border-2 border-[#ba8a40]/70 relative group h-64 bg-[#191C1D]">
                  <SafeImage
                    src={siteContent.smartTheatreVideoThumb || BSQUARE_IMAGES.edu03}
                    alt="BSquare Global Theatre Video Showcase"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#111314]/60 flex flex-col items-center justify-center p-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveVideoUrl(
                          `https://www.youtube.com/embed/${siteContent.youtubeShowcaseId}?autoplay=1`
                        );
                        setVideoModalOpen(true);
                      }}
                      aria-label="Play BSquare Global Theatre Video"
                      className="w-16 h-16 rounded-full bg-[#ba8a40] text-[#111314] flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
                    >
                      <Play className="w-7 h-7 fill-current ml-1" />
                    </button>
                    <span className="mt-3 font-obry-display text-xs font-extrabold uppercase tracking-wider text-white">
                      WATCH THEATRE WALKTHROUGH
                    </span>
                    <span className="text-[11px] text-[#ba8a40]">
                      BSquare Global Official Demo
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4E. HOME THEATRE PACKAGES (ECONOMIC, PREMIUM, LUXURY — OBRY PRICING CARDS)
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#151819] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
                <ObryBadge icon="🎬">HOME THEATRE PLANS</ObryBadge>
                <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                  Choose the Perfect Plan That Fits Your Lifestyle &amp; Budget
                </h2>
                <div className="flex justify-center">
                  <ObryGoldArc />
                </div>
                <p className="text-sm sm:text-base text-[#A1A1A1]">
                  Transparent, turnkey Home Theatre packages with acoustic treatments, branded projection &amp; audio systems, and luxury seating.
                </p>
              </div>

              {/* 3 Obry Pricing Cards */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {packages.map((pkg) => (
                  <div
                    key={pkg.id}
                    className={`relative rounded-[28px] p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                      pkg.popular
                        ? 'bg-[#191C1D] border-2 border-[#ba8a40] shadow-2xl shadow-[#ba8a40]/10 lg:-translate-y-2'
                        : 'bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40]/60'
                    }`}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3.5 right-6 px-4 py-1 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-[10px] font-extrabold uppercase tracking-widest shadow">
                        MOST POPULAR
                      </div>
                    )}

                    <div>
                      {/* Obry Split Upper Pricing Header Box */}
                      <div className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30] flex items-center justify-between gap-4">
                        <div>
                          <div className="font-obry-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#A1A1A1]">
                            {pkg.name} PLAN
                          </div>
                          <div className="mt-2 flex items-baseline gap-1.5">
                            <span className="font-obry-display text-3xl sm:text-4xl font-extrabold text-[#ba8a40]">
                              {pkg.price}
                            </span>
                            <span className="font-obry-display text-sm font-bold text-white uppercase">
                              {pkg.unit}
                            </span>
                          </div>
                        </div>
                        <div className="h-12 w-[1px] bg-[#2A2E30]" />
                        <div className="w-12 h-12 rounded-2xl bg-[#191C1D] border border-[#ba8a40]/40 flex items-center justify-center text-[#ba8a40] shrink-0">
                          <Tv className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Package Feature List */}
                      <ul className="mt-7 space-y-4">
                        {pkg.features.map((feat) => (
                          <li key={feat} className="flex items-start gap-3 text-sm text-white/90">
                            <span className="w-5 h-5 rounded-full bg-[#ba8a40]/15 border border-[#ba8a40] flex items-center justify-center text-[#ba8a40] shrink-0 mt-0.5">
                              <Check className="w-3 h-3" />
                            </span>
                            <span className="leading-relaxed">{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Obry Gold Pill CTA Button */}
                    <div className="mt-8 pt-6 border-t border-[#2A2E30]">
                      <button
                        type="button"
                        onClick={() =>
                          navigateTo(
                            'contact',
                            `Home Theatre - ${pkg.name} (${pkg.price} ${pkg.unit})`
                          )
                        }
                        className={`w-full py-4 px-6 rounded-full font-obry-display text-xs font-extrabold uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-all ${
                          pkg.popular
                            ? 'bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] shadow-lg'
                            : 'bg-[#151819] hover:bg-[#ba8a40] text-white hover:text-[#111314] border border-[#ba8a40]/50'
                        }`}
                      >
                        <span>Request Enquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4F. WHY CHOOSE BSQUARE GLOBAL? (OBRY NUMBERED CARDS + CLIENT BAR)
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#111314] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-4">
                  <ObryBadge icon="★">WHY CHOOSE US</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    Why Choose BSquare Global?
                  </h2>
                  <ObryGoldArc />
                </div>
                <p className="text-sm sm:text-base text-[#A1A1A1] max-w-md">
                  Precision acoustic engineering, certified global AV brands, and transparent turnkey execution across India and the UAE.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {WHY_CHOOSE_ITEMS.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="p-7 rounded-[24px] bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] transition-all group"
                    >
                      <div className="flex items-center justify-between mb-6">
                        <span className="font-obry-display text-3xl font-extrabold text-[#ba8a40]">
                          {item.num}
                        </span>
                        <div className="w-12 h-12 rounded-2xl bg-[#151819] border border-[#2A2E30] group-hover:border-[#ba8a40] flex items-center justify-center text-[#ba8a40] transition-colors">
                          <Icon className="w-6 h-6" />
                        </div>
                      </div>
                      <h3 className="font-obry-display text-lg font-bold text-white">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#A1A1A1] mt-2 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Obry Client Logo Bar */}
              <div className="pt-8 border-t border-[#2A2E30]">
                <div className="text-center text-xs font-bold uppercase tracking-[0.25em] text-[#A1A1A1] mb-6">
                  TRUSTED BY INSTITUTIONS, CORPORATES &amp; LUXURY HOMEOWNERS ACROSS UAE &amp; INDIA
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
                  {CLIENT_PORTFOLIO_BADGES.map((c) => (
                    <div
                      key={c.id}
                      className="p-3.5 rounded-2xl bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40]/50 text-center transition-all"
                    >
                      <div className="font-obry-display text-[11px] font-bold text-white truncate">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#ba8a40] uppercase tracking-wider mt-0.5">
                        {c.region}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4G. FEATURED PROJECTS (CATEGORIES REMOVED)
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#151819] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div className="space-y-4">
                  <ObryBadge icon="✳">OUR WORKS</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    Featured Projects
                  </h2>
                  <ObryGoldArc />
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('projects')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all self-start md:self-auto"
                >
                  <span>View All Projects</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects
                  .filter((p) => p.featured)
                  .slice(0, 4)
                  .map((proj) => (
                    <div
                      key={proj.id}
                      onClick={() => {
                        setSelectedProject(proj);
                        setProjectModalImageIdx(0);
                      }}
                      className="group cursor-pointer rounded-[28px] bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] p-5 transition-all duration-300"
                    >
                      <div className="relative h-64 sm:h-72 rounded-[20px] overflow-hidden bg-[#111314]">
                        <SafeImage
                          src={proj.images[0]}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="pt-5 px-2 flex items-end justify-between gap-4">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-1.5 text-xs text-[#A1A1A1]">
                            <MapPin className="w-3.5 h-3.5 text-[#ba8a40]" />
                            <span>{proj.location}</span>
                          </div>
                          <h3 className="font-obry-display text-xl font-bold text-white group-hover:text-[#ba8a40] transition-colors">
                            {proj.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-[#A1A1A1] line-clamp-2">
                            {proj.shortDesc}
                          </p>
                        </div>
                        <span className="w-12 h-12 rounded-full bg-[#151819] border border-[#2A2E30] group-hover:bg-[#ba8a40] group-hover:text-[#111314] group-hover:border-[#ba8a40] flex items-center justify-center shrink-0 transition-all">
                          <ArrowUpRight className="w-5 h-5" />
                        </span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4H. GALLERY PREVIEW (CATEGORIES REMOVED)
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-28 bg-[#111314] border-b border-[#2A2E30]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
                <div className="space-y-4">
                  <ObryBadge icon="📸">VISUAL ARCHIVE</ObryBadge>
                  <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                    Inside Our World of Experiences
                  </h2>
                  <ObryGoldArc />
                </div>
                <button
                  type="button"
                  onClick={() => navigateTo('gallery')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#191C1D] hover:bg-[#ba8a40] text-white hover:text-[#111314] border border-[#ba8a40]/50 font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all self-start md:self-auto"
                >
                  <span>View Full Gallery</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {sortedGallery.slice(0, 8).map((item, idx) => (
                  <div
                    key={item.id}
                    onClick={() => setLightboxIndex(idx)}
                    className="group relative h-52 sm:h-64 rounded-2xl overflow-hidden border border-[#2A2E30] hover:border-[#ba8a40] cursor-pointer bg-[#191C1D]"
                  >
                    <SafeImage
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111314] via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h4 className="font-obry-display text-xs font-bold text-white truncate">
                        {item.title}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* -----------------------------------------------------------------
              4I. CONTACT CTA ("Let's Create Something Extraordinary.")
          ----------------------------------------------------------------- */}
          <section className="py-20 lg:py-24 bg-[#151819]">
            <div className="max-w-7xl mx-auto px-4 sm:px-8">
              <div className="relative rounded-[32px] bg-gradient-to-br from-[#191C1D] via-[#191C1D] to-[#231c12] border-2 border-[#ba8a40]/60 p-8 sm:p-14 lg:p-16 overflow-hidden">
                <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                  <div className="space-y-4 max-w-2xl">
                    <ObryBadge icon="✨">READY TO TRANSFORM YOUR SPACE?</ObryBadge>
                    <h2 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                      {siteContent.ctaHeading}
                    </h2>
                    <p className="text-base text-[#A1A1A1] leading-relaxed">
                      {siteContent.ctaSubtext}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => navigateTo('contact')}
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] font-obry-display text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-xl transition-all"
                    >
                      <span>Contact Us</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <a
                      href={getWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111314] hover:bg-[#222628] text-white border border-[#ba8a40] font-obry-display text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all"
                    >
                      <MessageCircle className="w-4 h-4 text-[#ba8a40]" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          PAGE 2: PROJECTS PAGE (/projects) — CATEGORIES REMOVED
      ===================================================================== */}
      {currentPage === 'projects' && (
        <main className="py-16 lg:py-24 bg-[#151819] min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            {/* Page Header */}
            <div className="space-y-4 max-w-3xl">
              <ObryBadge icon="✳">PORTFOLIO • /PROJECTS</ObryBadge>
              <h1 className="font-obry-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                Our Projects
              </h1>
              <ObryGoldArc />
              <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
                Explore our work in immersive Smart Theatres, Home Theatres, and 3D Theatre installations across India and the UAE.
              </p>
            </div>

            {/* Project Cards Grid (No Categories) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    setSelectedProject(proj);
                    setProjectModalImageIdx(0);
                  }}
                  className="group cursor-pointer rounded-[28px] bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] p-5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <div className="relative h-64 sm:h-72 rounded-[20px] overflow-hidden bg-[#111314]">
                      <SafeImage
                        src={proj.images[0]}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {proj.videoUrl && (
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-[10px] font-extrabold uppercase tracking-wider inline-flex items-center gap-1">
                            <Play className="w-3 h-3 fill-current" />
                            <span>Video</span>
                          </span>
                        </div>
                      )}
                      <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-[#111314]/80 text-[11px] text-white font-medium">
                        {proj.images.length} Photos
                      </div>
                    </div>

                    <div className="pt-5 px-2 space-y-2">
                      <div className="flex items-center gap-1.5 text-xs text-[#ba8a40] font-semibold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{proj.location}</span>
                      </div>
                      <h2 className="font-obry-display text-xl font-bold text-white group-hover:text-[#ba8a40] transition-colors">
                        {proj.title}
                      </h2>
                      <p className="text-sm text-[#A1A1A1] leading-relaxed">
                        {proj.shortDesc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 px-2 border-t border-[#2A2E30] flex items-center justify-between">
                    <span className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-white group-hover:text-[#ba8a40] transition-colors">
                      View Project Details
                    </span>
                    <span className="w-10 h-10 rounded-full bg-[#151819] border border-[#2A2E30] group-hover:bg-[#ba8a40] group-hover:text-[#111314] group-hover:border-[#ba8a40] flex items-center justify-center transition-all">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE 3: GALLERY PAGE (/gallery) — CATEGORIES REMOVED
      ===================================================================== */}
      {currentPage === 'gallery' && (
        <main className="py-16 lg:py-24 bg-[#151819] min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
            {/* Gallery Header */}
            <div className="space-y-4 max-w-3xl">
              <ObryBadge icon="📸">VISUAL PORTFOLIO • /GALLERY</ObryBadge>
              <h1 className="font-obry-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white">
                Inside Our World of Experiences.
              </h1>
              <ObryGoldArc />
              <p className="text-base sm:text-lg text-[#A1A1A1] leading-relaxed">
                Explore authentic installation photographs from BSquare Global’s Smart Theatre classrooms, Dolby Atmos home cinemas, and 3D theatres.
              </p>
            </div>

            {/* Editorial Masonry-Style Responsive Grid (No Categories) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedGallery.map((item, index) => (
                <div
                  key={item.id}
                  onClick={() => setLightboxIndex(index)}
                  className={`group relative rounded-[24px] overflow-hidden bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] cursor-pointer transition-all ${
                    item.aspect === 'wide'
                      ? 'sm:col-span-2 h-72 sm:h-80'
                      : 'h-72 sm:h-80'
                  }`}
                >
                  <SafeImage
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111314] via-[#111314]/25 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#111314]/80 border border-[#ba8a40]/50 text-[#ba8a40] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Eye className="w-4 h-4" />
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 space-y-1">
                    <h3 className="font-obry-display text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="text-xs text-[#A1A1A1] line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          PAGE 4: CONTACT PAGE (/contact) — OBRY TWO-COLUMN LAYOUT
      ===================================================================== */}
      {currentPage === 'contact' && (
        <main className="py-16 lg:py-24 bg-[#151819] min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Obry Contact Info with Dashed Circular Icon Badges */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-4">
                  <ObryBadge icon="📬">CONTACT US • /CONTACT</ObryBadge>
                  <h1 className="font-obry-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                    {siteContent.contactHeading}
                  </h1>
                  <ObryGoldArc />
                  <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                    Connect with BSquare Global’s engineering and design teams in India and the UAE for Smart Theatre, Home Theatre, and 3D Theatre consultations.
                  </p>
                </div>

                {/* Obry Dashed Circular Icon Contact Rows */}
                <div className="space-y-5 divide-y divide-[#2A2E30]">
                  <div className="pt-2 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#191C1D] border-2 border-dashed border-[#ba8a40] flex items-center justify-center text-[#ba8a40] shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                        INDIA OFFICE
                      </div>
                      <div className="text-base font-bold text-white mt-1">
                        Trivandrum, Kerala, India
                      </div>
                      <p className="text-sm text-[#A1A1A1] mt-0.5">
                        {siteContent.indiaAddress}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#191C1D] border-2 border-dashed border-[#ba8a40] flex items-center justify-center text-[#ba8a40] shrink-0">
                      <Globe className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                        UAE HEAD OFFICE
                      </div>
                      <div className="text-base font-bold text-white mt-1">
                        Ajman, United Arab Emirates
                      </div>
                      <p className="text-sm text-[#A1A1A1] mt-0.5">
                        {siteContent.uaeAddress}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#191C1D] border-2 border-dashed border-[#ba8a40] flex items-center justify-center text-[#ba8a40] shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                        DIRECT PHONE &amp; WHATSAPP
                      </div>
                      <div className="text-sm text-white font-semibold mt-1 space-y-1">
                        <div>UAE: {siteContent.phoneUae} / {siteContent.phoneUaeSecondary}</div>
                        <div>India: {siteContent.phoneIndia}</div>
                        <div className="text-[#ba8a40]">
                          WhatsApp: +{siteContent.whatsappNumber}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-5 flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-[#191C1D] border-2 border-dashed border-[#ba8a40] flex items-center justify-center text-[#ba8a40] shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                        OFFICIAL EMAIL
                      </div>
                      <a
                        href={`mailto:${siteContent.email}`}
                        className="text-base font-bold text-white hover:text-[#ba8a40] transition-colors mt-1 block"
                      >
                        {siteContent.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Direct WhatsApp Card */}
                <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#ba8a40]/50 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                      INSTANT WHATSAPP SUPPORT
                    </div>
                    <div className="text-sm text-white font-bold mt-1">
                      Chat directly with our Project Engineers
                    </div>
                  </div>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider inline-flex items-center gap-2 shrink-0"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat Now</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Professional Enquiry Form */}
              <div className="lg:col-span-7">
                <div className="rounded-[28px] bg-[#191C1D] border border-[#2A2E30] p-6 sm:p-10 shadow-2xl">
                  <h2 className="font-obry-display text-2xl font-bold text-white mb-2">
                    Project Enquiry Form
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A1A1A1] mb-8">
                    Complete the details below. Upon submission you can also dispatch your enquiry directly via WhatsApp or Email.
                  </p>

                  {submittedEnquiry ? (
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#151819] border-2 border-[#ba8a40] space-y-6">
                      <div className="flex items-center gap-3 text-[#ba8a40]">
                        <CheckCircle2 className="w-8 h-8 shrink-0" />
                        <div>
                          <div className="font-obry-display text-lg font-bold text-white">
                            Enquiry Logged Successfully ({submittedEnquiry.id})
                          </div>
                          <div className="text-xs text-[#A1A1A1]">
                            Thank you, {submittedEnquiry.name}. Choose how you would like to connect immediately:
                          </div>
                        </div>
                      </div>

                      <div className="p-4 rounded-xl bg-[#191C1D] border border-[#2A2E30] text-xs text-[#A1A1A1] space-y-1">
                        <div>
                          <strong className="text-white">Service:</strong>{' '}
                          {submittedEnquiry.service}
                        </div>
                        <div>
                          <strong className="text-white">Location:</strong>{' '}
                          {submittedEnquiry.location} ({submittedEnquiry.country})
                        </div>
                        <div>
                          <strong className="text-white">Contact:</strong>{' '}
                          {submittedEnquiry.mobile} &bull; {submittedEnquiry.email}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <a
                          href={getWhatsAppUrl(
                            `Hello BSquare Global, New Project Enquiry (${submittedEnquiry.id}):\nName: ${submittedEnquiry.name}\nMobile: ${submittedEnquiry.mobile}\nEmail: ${submittedEnquiry.email}\nCountry: ${submittedEnquiry.country}\nInterested Service: ${submittedEnquiry.service}\nProject Location: ${submittedEnquiry.location}\nMessage: ${submittedEnquiry.message}`
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider"
                        >
                          <MessageCircle className="w-4 h-4" />
                          <span>Send via WhatsApp Now</span>
                        </a>

                        <a
                          href={`mailto:${siteContent.email}?subject=${encodeURIComponent(
                            `Project Enquiry: ${submittedEnquiry.service} - ${submittedEnquiry.name}`
                          )}&body=${encodeURIComponent(
                            `Name: ${submittedEnquiry.name}\nMobile: ${submittedEnquiry.mobile}\nEmail: ${submittedEnquiry.email}\nCountry: ${submittedEnquiry.country}\nService: ${submittedEnquiry.service}\nProject Location: ${submittedEnquiry.location}\n\nMessage:\n${submittedEnquiry.message}`
                          )}`}
                          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#191C1D] text-white border border-[#ba8a40] font-obry-display text-xs font-extrabold uppercase tracking-wider"
                        >
                          <Mail className="w-4 h-4 text-[#ba8a40]" />
                          <span>Open in Email Client</span>
                        </a>

                        <button
                          type="button"
                          onClick={() => {
                            setSubmittedEnquiry(null);
                            setContactForm({
                              name: '',
                              mobile: '',
                              email: '',
                              country: 'India',
                              service: 'Smart Theatre',
                              location: '',
                              message: '',
                            });
                          }}
                          className="px-5 py-3.5 rounded-full bg-[#151819] text-[#A1A1A1] hover:text-white text-xs font-bold uppercase"
                        >
                          Submit Another Enquiry
                        </button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={validateAndSubmitEnquiry} className="space-y-5" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Your Name *
                          </label>
                          <input
                            type="text"
                            value={contactForm.name}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, name: e.target.value })
                            }
                            placeholder="Enter full name"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          />
                          {contactErrors.name && (
                            <p className="text-xs text-red-400 mt-1">{contactErrors.name}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Mobile Number (WhatsApp) *
                          </label>
                          <input
                            type="tel"
                            value={contactForm.mobile}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, mobile: e.target.value })
                            }
                            placeholder="+91 / +971 Mobile Number"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          />
                          {contactErrors.mobile && (
                            <p className="text-xs text-red-400 mt-1">{contactErrors.mobile}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, email: e.target.value })
                            }
                            placeholder="you@organization.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          />
                          {contactErrors.email && (
                            <p className="text-xs text-red-400 mt-1">{contactErrors.email}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Country *
                          </label>
                          <select
                            value={contactForm.country}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, country: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          >
                            <option value="India">India</option>
                            <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                            <option value="Saudi Arabia">Saudi Arabia</option>
                            <option value="Qatar">Qatar</option>
                            <option value="Oman">Oman</option>
                            <option value="Other International">Other International</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Interested Service *
                          </label>
                          <select
                            value={contactForm.service}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, service: e.target.value })
                            }
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          >
                            <option value="Smart Theatre">Smart Theatre (Classrooms &amp; Institutes)</option>
                            <option value="Home Theatre">Home Theatre</option>
                            <option value="Home Theatre - ECONOMIC (₹3–5 Lakh)">
                              Home Theatre — ECONOMIC (₹3–5 Lakh)
                            </option>
                            <option value="Home Theatre - PREMIUM (₹5–9 Lakh)">
                              Home Theatre — PREMIUM (₹5–9 Lakh)
                            </option>
                            <option value="Home Theatre - LUXURY (₹9–15 Lakh)">
                              Home Theatre — LUXURY (₹9–15 Lakh)
                            </option>
                            <option value="3D Theatre">3D Theatre</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                            Project Location (City / State) *
                          </label>
                          <input
                            type="text"
                            value={contactForm.location}
                            onChange={(e) =>
                              setContactForm({ ...contactForm, location: e.target.value })
                            }
                            placeholder="e.g. Trivandrum, Kochi, Dubai, Ajman"
                            className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                          />
                          {contactErrors.location && (
                            <p className="text-xs text-red-400 mt-1">{contactErrors.location}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-2">
                          Project Details &amp; Message *
                        </label>
                        <textarea
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                          placeholder="Tell us about your room dimensions, seating capacity, or institutional requirements..."
                          className="w-full px-4 py-3.5 rounded-xl bg-[#151819] border border-[#2A2E30] focus:border-[#ba8a40] text-white text-sm outline-none transition-colors"
                        />
                        {contactErrors.message && (
                          <p className="text-xs text-red-400 mt-1">{contactErrors.message}</p>
                        )}
                      </div>

                      <button
                        type="submit"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] font-obry-display text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all shadow-xl shadow-[#ba8a40]/15"
                      >
                        <span>Send Enquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          ADMIN DASHBOARD (/admin — ACCESSIBLE VIA DISCREET FOOTER LINK)
      ===================================================================== */}
      {currentPage === 'admin' && (
        <main className="py-16 lg:py-24 bg-[#111314] min-h-[80vh]">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto rounded-[28px] bg-[#191C1D] border border-[#2A2E30] p-8 space-y-6 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#ba8a40]/15 border border-[#ba8a40] flex items-center justify-center text-[#ba8a40]">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h1 className="font-obry-display text-xl font-bold text-white">
                      BSquare Global Admin
                    </h1>
                    <p className="text-xs text-[#A1A1A1]">
                      Content, Projects &amp; Gallery Management Portal
                    </p>
                  </div>
                </div>

                {adminLoginError && (
                  <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/40 text-xs text-red-300 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{adminLoginError}</span>
                  </div>
                )}

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      adminEmailInput.trim().toLowerCase() ===
                        'admin@bsquareglobal.com' &&
                      adminPasswordInput === 'BSquare@2025'
                    ) {
                      setIsAdminAuthenticated(true);
                      setAdminLoginError('');
                    } else {
                      setAdminLoginError(
                        'Invalid credentials. Use the Quick-Fill Demo Admin button below.'
                      );
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      value={adminEmailInput}
                      onChange={(e) => setAdminEmailInput(e.target.value)}
                      placeholder="admin@bsquareglobal.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#151819] border border-[#2A2E30] text-white text-sm outline-none focus:border-[#ba8a40]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#A1A1A1] mb-1.5">
                      Password
                    </label>
                    <input
                      type="password"
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full px-4 py-3 rounded-xl bg-[#151819] border border-[#2A2E30] text-white text-sm outline-none focus:border-[#ba8a40]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider"
                  >
                    Sign In to Dashboard
                  </button>
                </form>

                <div className="pt-4 border-t border-[#2A2E30] space-y-2">
                  <div className="text-[11px] text-[#A1A1A1]">
                    Demo Admin Access: <code className="text-[#ba8a40]">admin@bsquareglobal.com</code> / <code className="text-[#ba8a40]">BSquare@2025</code>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminEmailInput('admin@bsquareglobal.com');
                      setAdminPasswordInput('BSquare@2025');
                      setIsAdminAuthenticated(true);
                    }}
                    className="w-full py-2.5 rounded-xl bg-[#151819] hover:bg-[#222628] border border-[#ba8a40]/40 text-xs font-bold text-[#ba8a40] transition-colors"
                  >
                    One-Click Demo Admin Login
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                {/* Admin Top Bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30]">
                  <div>
                    <ObryBadge>ADMIN CMS PORTAL</ObryBadge>
                    <h1 className="font-obry-display text-2xl font-bold text-white mt-2">
                      BSquare Global Live Website Manager
                    </h1>
                    <p className="text-xs text-[#A1A1A1]">
                      All edits to Projects, Gallery, Packages, Services, and Contact details reflect immediately on the public site.
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSiteContent(INITIAL_CONTENT);
                        setServices(INITIAL_SERVICES);
                        setPackages(INITIAL_PACKAGES);
                        setProjects(INITIAL_PROJECTS);
                        setGallery(INITIAL_GALLERY);
                        showToast('Restored default BSquare Global website content.');
                      }}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#151819] border border-[#2A2E30] hover:border-[#ba8a40] text-xs font-bold text-[#A1A1A1] hover:text-white"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdminAuthenticated(false)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-red-500/15 border border-red-500/40 text-xs font-bold text-red-300"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>

                {adminToast && (
                  <div className="p-4 rounded-xl bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-bold flex items-center justify-between">
                    <span>{adminToast}</span>
                    <button type="button" onClick={() => setAdminToast(null)}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Admin Navigation Tabs */}
                <div className="flex flex-wrap gap-2">
                  {(
                    [
                      { id: 'projects', label: `Projects (${projects.length})` },
                      { id: 'gallery', label: `Gallery (${gallery.length})` },
                      { id: 'content', label: 'Website Content & Packages' },
                      { id: 'enquiries', label: `Enquiries (${enquiries.length})` },
                    ] as const
                  ).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAdminTab(t.id)}
                      className={`px-5 py-3 rounded-full font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all ${
                        adminTab === t.id
                          ? 'bg-[#ba8a40] text-[#111314]'
                          : 'bg-[#191C1D] text-[#A1A1A1] hover:text-white border border-[#2A2E30]'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* TAB 1: PROJECTS MANAGEMENT */}
                {adminTab === 'projects' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h2 className="font-obry-display text-xl font-bold text-white">
                        Manage Portfolio Projects
                      </h2>
                      <button
                        type="button"
                        onClick={() =>
                          setEditingProject({
                            id: `proj-${Date.now()}`,
                            title: 'New BSquare Global Installation',
                            location: 'Trivandrum, Kerala, India',
                            shortDesc: 'Turnkey audio-visual and acoustic transformation.',
                            overview: 'Custom engineered smart environment.',
                            description:
                              'Complete installation featuring acoustic wall treatments, 4K projection, and smart automation.',
                            servicesProvided: ['Smart Theatre', 'Acoustics', 'Automation'],
                            images: [BSQUARE_IMAGES.edu01],
                            featured: true,
                          })
                        }
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add New Project</span>
                      </button>
                    </div>

                    {/* Project Editor Form */}
                    {editingProject && (
                      <div className="p-6 rounded-2xl bg-[#191C1D] border-2 border-[#ba8a40] space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-obry-display text-base font-bold text-[#ba8a40]">
                            Editing Project: {editingProject.title}
                          </h3>
                          <button
                            type="button"
                            onClick={() => setEditingProject(null)}
                            className="text-xs text-[#A1A1A1] hover:text-white"
                          >
                            Close
                          </button>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editingProject.title}
                            onChange={(e) =>
                              setEditingProject({ ...editingProject, title: e.target.value })
                            }
                            placeholder="Project Title"
                            className="px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                          <input
                            type="text"
                            value={editingProject.location}
                            onChange={(e) =>
                              setEditingProject({
                                ...editingProject,
                                location: e.target.value,
                              })
                            }
                            placeholder="Location (e.g. Kerala, India / UAE)"
                            className="px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>

                        <textarea
                          rows={2}
                          value={editingProject.shortDesc}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              shortDesc: e.target.value,
                            })
                          }
                          placeholder="Short Card Summary"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                        />

                        <textarea
                          rows={3}
                          value={editingProject.description}
                          onChange={(e) =>
                            setEditingProject({
                              ...editingProject,
                              description: e.target.value,
                            })
                          }
                          placeholder="Full Project Description"
                          className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                        />

                        {/* Project Photographs Upload / URL Manager */}
                        <div className="space-y-2">
                          <div className="text-xs font-bold uppercase text-[#A1A1A1]">
                            Project Photographs ({editingProject.images.length})
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {editingProject.images.map((img, i) => (
                              <div
                                key={i}
                                className="relative w-24 h-16 rounded-lg overflow-hidden border border-[#2A2E30]"
                              >
                                <SafeImage
                                  src={img}
                                  alt="Project thumb"
                                  className="w-full h-full object-cover"
                                />
                                {editingProject.images.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setEditingProject({
                                        ...editingProject,
                                        images: editingProject.images.filter(
                                          (_, idx) => idx !== i
                                        ),
                                      })
                                    }
                                    className="absolute top-1 right-1 w-5 h-5 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px]"
                                  >
                                    ×
                                  </button>
                                )}
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-wrap gap-2 pt-2">
                            <input
                              type="text"
                              value={newProjectImageInput}
                              onChange={(e) => setNewProjectImageInput(e.target.value)}
                              placeholder="Paste Image URL..."
                              className="flex-1 px-3 py-2 rounded-xl bg-[#151819] border border-[#2A2E30] text-xs text-white"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (!newProjectImageInput.trim()) return;
                                setEditingProject({
                                  ...editingProject,
                                  images: [
                                    ...editingProject.images,
                                    newProjectImageInput.trim(),
                                  ],
                                });
                                setNewProjectImageInput('');
                              }}
                              className="px-4 py-2 rounded-xl bg-[#151819] border border-[#ba8a40] text-xs font-bold text-[#ba8a40]"
                            >
                              Add Image URL
                            </button>
                            <label className="px-4 py-2 rounded-xl bg-[#151819] border border-[#2A2E30] text-xs font-bold text-white cursor-pointer inline-flex items-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-[#ba8a40]" />
                              <span>Upload File</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (uri) =>
                                    setEditingProject({
                                      ...editingProject,
                                      images: [...editingProject.images, uri],
                                    })
                                  )
                                }
                              />
                            </label>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-3">
                          <label className="inline-flex items-center gap-2 text-xs text-white cursor-pointer">
                            <input
                              type="checkbox"
                              checked={editingProject.featured}
                              onChange={(e) =>
                                setEditingProject({
                                  ...editingProject,
                                  featured: e.target.checked,
                                })
                              }
                            />
                            <span>Feature this project on Homepage</span>
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setProjects((prev) => {
                                const exists = prev.some(
                                  (p) => p.id === editingProject.id
                                );
                                if (exists) {
                                  return prev.map((p) =>
                                    p.id === editingProject.id ? editingProject : p
                                  );
                                }
                                return [editingProject, ...prev];
                              });
                              setEditingProject(null);
                              showToast('Project saved and published to website.');
                            }}
                            className="px-6 py-2.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase"
                          >
                            Save Project
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Existing Projects List */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {projects.map((p) => (
                        <div
                          key={p.id}
                          className="p-4 rounded-2xl bg-[#191C1D] border border-[#2A2E30] flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <SafeImage
                              src={p.images[0]}
                              alt={p.title}
                              className="w-16 h-16 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                              {p.featured && (
                                <span className="inline-block px-2 py-0.5 rounded bg-[#ba8a40]/20 text-[#ba8a40] text-[10px] font-bold mb-0.5">
                                  Featured
                                </span>
                              )}
                              <h4 className="font-obry-display text-sm font-bold text-white truncate">
                                {p.title}
                              </h4>
                              <p className="text-xs text-[#A1A1A1] truncate">{p.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              type="button"
                              onClick={() => setEditingProject(p)}
                              aria-label={`Edit ${p.title}`}
                              className="p-2 rounded-lg bg-[#151819] border border-[#2A2E30] text-white hover:border-[#ba8a40]"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: 'project',
                                  id: p.id,
                                  title: p.title,
                                })
                              }
                              aria-label={`Delete ${p.title}`}
                              className="p-2 rounded-lg bg-[#151819] border border-[#2A2E30] text-red-400 hover:border-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 2: GALLERY MANAGEMENT */}
                {adminTab === 'gallery' && (
                  <div className="space-y-8">
                    {/* Add New Photograph Form */}
                    <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-4">
                      <h2 className="font-obry-display text-lg font-bold text-white">
                        Upload / Add Photograph to Gallery
                      </h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={newGalleryForm.title}
                          onChange={(e) =>
                            setNewGalleryForm({ ...newGalleryForm, title: e.target.value })
                          }
                          placeholder="Photograph Title"
                          className="px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                        />
                        <input
                          type="text"
                          value={newGalleryForm.caption}
                          onChange={(e) =>
                            setNewGalleryForm({
                              ...newGalleryForm,
                              caption: e.target.value,
                            })
                          }
                          placeholder="Caption"
                          className="px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                        />
                      </div>
                      <div className="flex flex-wrap items-center gap-3">
                        <input
                          type="text"
                          value={newGalleryForm.imageUrl}
                          onChange={(e) =>
                            setNewGalleryForm({
                              ...newGalleryForm,
                              imageUrl: e.target.value,
                            })
                          }
                          placeholder="Image URL or upload file..."
                          className="flex-1 px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                        />
                        <label className="px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-xs font-bold text-white cursor-pointer inline-flex items-center gap-2">
                          <Upload className="w-4 h-4 text-[#ba8a40]" />
                          <span>Upload Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleFileUpload(e, (uri) =>
                                setNewGalleryForm({ ...newGalleryForm, imageUrl: uri })
                              )
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (!newGalleryForm.title.trim() || !newGalleryForm.imageUrl.trim())
                              return;
                            setGallery((prev) => [
                              ...prev,
                              {
                                id: `gal-${Date.now()}`,
                                ...newGalleryForm,
                                order: prev.length + 1,
                              },
                            ]);
                            setNewGalleryForm({
                              title: '',
                              caption: '',
                              imageUrl: '',
                              aspect: 'wide',
                            });
                            showToast('Photograph added to Gallery.');
                          }}
                          className="px-6 py-2.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase"
                        >
                          Add to Gallery
                        </button>
                      </div>
                    </div>

                    {/* Gallery Reorder / Edit List */}
                    <div className="space-y-3">
                      {sortedGallery.map((g, idx) => (
                        <div
                          key={g.id}
                          className="p-4 rounded-2xl bg-[#191C1D] border border-[#2A2E30] flex flex-wrap items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-4">
                            <SafeImage
                              src={g.imageUrl}
                              alt={g.title}
                              className="w-16 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <span className="text-[10px] font-bold uppercase text-[#ba8a40]">
                                #{idx + 1} &bull; {g.title}
                              </span>
                              <input
                                type="text"
                                value={g.caption}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setGallery((prev) =>
                                    prev.map((item) =>
                                      item.id === g.id ? { ...item, caption: val } : item
                                    )
                                  );
                                }}
                                className="block mt-0.5 px-2.5 py-1 rounded bg-[#151819] border border-[#2A2E30] text-xs text-white w-64 sm:w-96"
                              />
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                if (idx === 0) return;
                                const copy = [...sortedGallery];
                                const temp = copy[idx - 1].order;
                                copy[idx - 1].order = copy[idx].order;
                                copy[idx].order = temp;
                                setGallery(copy);
                              }}
                              aria-label="Move image up"
                              className="p-2 rounded-lg bg-[#151819] border border-[#2A2E30] text-white"
                            >
                              <ArrowUp className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (idx === sortedGallery.length - 1) return;
                                const copy = [...sortedGallery];
                                const temp = copy[idx + 1].order;
                                copy[idx + 1].order = copy[idx].order;
                                copy[idx].order = temp;
                                setGallery(copy);
                              }}
                              aria-label="Move image down"
                              className="p-2 rounded-lg bg-[#151819] border border-[#2A2E30] text-white"
                            >
                              <ArrowDown className="w-4 h-4" />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setDeleteConfirmTarget({
                                  type: 'gallery',
                                  id: g.id,
                                  title: g.title,
                                })
                              }
                              aria-label={`Delete ${g.title}`}
                              className="p-2 rounded-lg bg-[#151819] border border-[#2A2E30] text-red-400"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: WEBSITE CONTENT, SERVICES & PACKAGES CMS */}
                {adminTab === 'content' && (
                  <div className="space-y-8">
                    {/* Homepage Headings & Contact Info */}
                    <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-4">
                      <h2 className="font-obry-display text-lg font-bold text-white">
                        Homepage Headings, Company Introduction &amp; Contact Info
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            Hero Main Headline
                          </label>
                          <input
                            type="text"
                            value={siteContent.heroHeadline}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                heroHeadline: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            Company Intro Heading
                          </label>
                          <input
                            type="text"
                            value={siteContent.introHeading}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                introHeading: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            Company Introduction Copy
                          </label>
                          <textarea
                            rows={2}
                            value={siteContent.introText}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                introText: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            India Office Address
                          </label>
                          <input
                            type="text"
                            value={siteContent.indiaAddress}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                indiaAddress: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            UAE Office Address
                          </label>
                          <input
                            type="text"
                            value={siteContent.uaeAddress}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                uaeAddress: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            India Phone
                          </label>
                          <input
                            type="text"
                            value={siteContent.phoneIndia}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                phoneIndia: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-xs text-[#A1A1A1] mb-1">
                            UAE Phone
                          </label>
                          <input
                            type="text"
                            value={siteContent.phoneUae}
                            onChange={(e) =>
                              setSiteContent({
                                ...siteContent,
                                phoneUae: e.target.value,
                              })
                            }
                            className="w-full px-4 py-2.5 rounded-xl bg-[#151819] border border-[#2A2E30] text-sm text-white"
                          />
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          showToast('Website headings and contact details updated!')
                        }
                        className="px-6 py-2.5 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase"
                      >
                        Save Content Changes
                      </button>
                    </div>

                    {/* Home Theatre Packages Pricing Editor */}
                    <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-4">
                      <h2 className="font-obry-display text-lg font-bold text-white">
                        Update Home Theatre Package Prices &amp; Features
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {packages.map((pkg) => (
                          <div
                            key={pkg.id}
                            className="p-4 rounded-xl bg-[#151819] border border-[#2A2E30] space-y-3"
                          >
                            <div className="font-obry-display text-sm font-bold text-[#ba8a40]">
                              {pkg.name}
                            </div>
                            <input
                              type="text"
                              value={pkg.price}
                              onChange={(e) => {
                                const val = e.target.value;
                                setPackages((prev) =>
                                  prev.map((item) =>
                                    item.id === pkg.id ? { ...item, price: val } : item
                                  )
                                );
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-[#191C1D] border border-[#2A2E30] text-sm text-white"
                            />
                            <textarea
                              rows={4}
                              value={pkg.features.join('\n')}
                              onChange={(e) => {
                                const lines = e.target.value
                                  .split('\n')
                                  .filter((l) => l.trim().length > 0);
                                setPackages((prev) =>
                                  prev.map((item) =>
                                    item.id === pkg.id ? { ...item, features: lines } : item
                                  )
                                );
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-[#191C1D] border border-[#2A2E30] text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Homepage Images Manager (Hero Slider, About, Classroom Comparison & Feature Photos) */}
                    <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-5">
                      <div>
                        <h2 className="font-obry-display text-lg font-bold text-white">
                          Homepage Images Manager (Upload or Paste URL)
                        </h2>
                        <p className="text-xs text-[#A1A1A1] mt-1">
                          Replace the 3 Hero Slider banners, About section photos, Traditional vs. Smart Classroom comparison images, and Smart Theatre feature photos directly from Admin.
                        </p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {(
                          [
                            { key: 'heroSlide1Image', label: 'Hero Slide 1 (Smart Theatre)' },
                            { key: 'heroSlide2Image', label: 'Hero Slide 2 (Home Theatre)' },
                            { key: 'heroSlide3Image', label: 'Hero Slide 3 (3D Theatre)' },
                            { key: 'traditionalClassroomImage', label: 'Comparison: Traditional Classroom (Before)' },
                            { key: 'smartClassroomImage', label: 'Comparison: Smart Classroom (After)' },
                            { key: 'aboutImage1', label: 'About Section Photo 1' },
                            { key: 'aboutImage2', label: 'About Section Photo 2' },
                            { key: 'smartTheatrePhoto1', label: 'Smart Theatre Feature Photo 1' },
                            { key: 'smartTheatrePhoto2', label: 'Smart Theatre Feature Photo 2' },
                          ] as { key: keyof SiteContent; label: string }[]
                        ).map((slot) => (
                          <div
                            key={slot.key}
                            className="p-4 rounded-xl bg-[#151819] border border-[#2A2E30] space-y-2.5"
                          >
                            <div className="text-xs font-bold text-[#ba8a40]">{slot.label}</div>
                            <div className="h-28 rounded-lg overflow-hidden border border-[#2A2E30] bg-[#111314]">
                              <SafeImage
                                src={(siteContent[slot.key] as string) || BSQUARE_IMAGES.heroMain}
                                alt={slot.label}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <input
                              type="text"
                              value={(siteContent[slot.key] as string) || ''}
                              onChange={(e) =>
                                setSiteContent({
                                  ...siteContent,
                                  [slot.key]: e.target.value,
                                })
                              }
                              placeholder="Paste Image URL..."
                              className="w-full px-3 py-1.5 rounded-lg bg-[#191C1D] border border-[#2A2E30] text-xs text-white"
                            />
                            <label className="w-full py-2 px-3 rounded-lg bg-[#191C1D] hover:border-[#ba8a40] border border-[#2A2E30] text-xs font-bold text-white cursor-pointer inline-flex items-center justify-center gap-1.5 transition-colors">
                              <Upload className="w-3.5 h-3.5 text-[#ba8a40]" />
                              <span>Upload From Computer</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (uri) => {
                                    setSiteContent({
                                      ...siteContent,
                                      [slot.key]: uri,
                                    });
                                    showToast(`Updated ${slot.label}`);
                                  })
                                }
                              />
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Service Descriptions & Service Card Images Editor */}
                    <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-4">
                      <h2 className="font-obry-display text-lg font-bold text-white">
                        Update Service Descriptions &amp; Photos (3 Core Services)
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {services.map((srv) => (
                          <div
                            key={srv.id}
                            className="p-4 rounded-xl bg-[#151819] border border-[#2A2E30] space-y-2.5"
                          >
                            <div className="font-obry-display text-xs font-bold text-[#ba8a40]">
                              {srv.number}. {srv.name}
                            </div>
                            <div className="h-28 rounded-lg overflow-hidden border border-[#2A2E30] bg-[#111314]">
                              <SafeImage
                                src={srv.image}
                                alt={srv.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <label className="w-full py-1.5 px-3 rounded-lg bg-[#191C1D] hover:border-[#ba8a40] border border-[#2A2E30] text-xs font-bold text-white cursor-pointer inline-flex items-center justify-center gap-1.5">
                              <Upload className="w-3.5 h-3.5 text-[#ba8a40]" />
                              <span>Replace Service Photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleFileUpload(e, (uri) => {
                                    setServices((prev) =>
                                      prev.map((item) =>
                                        item.id === srv.id ? { ...item, image: uri } : item
                                      )
                                    );
                                    showToast(`Updated ${srv.name} photo`);
                                  })
                                }
                              />
                            </label>
                            <textarea
                              rows={3}
                              value={srv.shortDesc}
                              onChange={(e) => {
                                const val = e.target.value;
                                setServices((prev) =>
                                  prev.map((item) =>
                                    item.id === srv.id ? { ...item, shortDesc: val } : item
                                  )
                                );
                              }}
                              className="w-full px-3 py-2 rounded-lg bg-[#191C1D] border border-[#2A2E30] text-xs text-white"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 4: ENQUIRIES INBOX */}
                {adminTab === 'enquiries' && (
                  <div className="p-6 rounded-2xl bg-[#191C1D] border border-[#2A2E30] space-y-4">
                    <h2 className="font-obry-display text-lg font-bold text-white">
                      Submitted Project Enquiries ({enquiries.length})
                    </h2>
                    {enquiries.length === 0 ? (
                      <p className="text-sm text-[#A1A1A1]">
                        No enquiries submitted in this session yet. Test the Contact page form to see live submissions here.
                      </p>
                    ) : (
                      <div className="space-y-3">
                        {enquiries.map((enq) => (
                          <div
                            key={enq.id}
                            className="p-4 rounded-xl bg-[#151819] border border-[#2A2E30] space-y-1"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-obry-display text-xs font-bold text-[#ba8a40]">
                                {enq.id} &bull; {enq.service}
                              </span>
                              <span className="text-xs text-[#A1A1A1]">{enq.createdAt}</span>
                            </div>
                            <div className="text-sm font-bold text-white">
                              {enq.name} ({enq.mobile} | {enq.email})
                            </div>
                            <div className="text-xs text-[#A1A1A1]">
                              Location: {enq.location}, {enq.country}
                            </div>
                            <p className="text-xs text-white/90 pt-1">{enq.message}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      )}

      {/* =====================================================================
          4J. FOOTER (OBRY DARK ARCHITECTURAL FOOTER + DISCREET ADMIN LINK)
      ===================================================================== */}
      <footer className="bg-[#111314] border-t border-[#2A2E30] pt-16 pb-10 text-[#A1A1A1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#2A2E30]">
            {/* Col 1: Logo, Description & Social Media Links */}
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center">
                <SafeImage
                  src={BSQUARE_IMAGES.logo}
                  alt="BSquare Global Logo"
                  fallbackLabel="BSQUARE GLOBAL"
                  className="h-11 sm:h-12 w-auto object-contain bg-transparent"
                />
              </div>
              <p className="text-sm leading-relaxed text-[#A1A1A1]">
                We create intelligent solutions for immersive Smart Theatre, Home Theatre, and 3D Theatre experiences across India and the UAE.
              </p>
              <div className="flex items-center gap-3 pt-1">
                <a
                  href={siteContent.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSquare Global Instagram"
                  className="w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteContent.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSquare Global Facebook"
                  className="w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
                >
                  <Facebook className="w-4 h-4" />
                </a>
                <a
                  href={siteContent.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSquare Global YouTube"
                  className="w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="BSquare Global WhatsApp"
                  className="w-10 h-10 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Col 2: Four Navigation Links */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-obry-display text-xs font-extrabold uppercase tracking-[0.2em] text-white">
                NAVIGATION
              </h3>
              <ul className="space-y-2.5 text-sm">
                {(
                  [
                    { id: 'home', label: 'Home' },
                    { id: 'projects', label: 'Projects' },
                    { id: 'gallery', label: 'Gallery' },
                    { id: 'contact', label: 'Contact' },
                  ] as { id: PageRoute; label: string }[]
                ).map((nav) => (
                  <li key={nav.id}>
                    <button
                      type="button"
                      onClick={() => navigateTo(nav.id)}
                      className="hover:text-[#ba8a40] transition-colors inline-flex items-center gap-1.5"
                    >
                      <span>{nav.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: India Contact Information */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-obry-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba8a40]">
                INDIA OFFICE
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {siteContent.indiaAddress}
              </p>
              <div className="text-sm space-y-1">
                <div>
                  Phone:{' '}
                  <a
                    href={`tel:${siteContent.phoneIndia.replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#ba8a40]"
                  >
                    {siteContent.phoneIndia}
                  </a>
                </div>
                <div>
                  WhatsApp:{' '}
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#ba8a40] hover:underline"
                  >
                    +{siteContent.whatsappNumber}
                  </a>
                </div>
              </div>
            </div>

            {/* Col 4: UAE Contact Information & Email */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-obry-display text-xs font-extrabold uppercase tracking-[0.2em] text-[#ba8a40]">
                UAE OFFICE
              </h3>
              <p className="text-sm text-white/90 leading-relaxed">
                {siteContent.uaeAddress}
              </p>
              <div className="text-sm space-y-1">
                <div>
                  Phone:{' '}
                  <a
                    href={`tel:${siteContent.phoneUae.replace(/\s+/g, '')}`}
                    className="text-white hover:text-[#ba8a40]"
                  >
                    {siteContent.phoneUae}
                  </a>{' '}
                  / {siteContent.phoneUaeSecondary}
                </div>
                <div>
                  Email:{' '}
                  <a
                    href={`mailto:${siteContent.email}`}
                    className="text-[#ba8a40] hover:underline"
                  >
                    {siteContent.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Discreet Admin Login Link */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
            <div>
              Copyright &copy; {new Date().getFullYear()} BSquare Global. All Rights Reserved.
            </div>
            <div className="flex items-center gap-6">
              <span>Smart Theatre &bull; Home Theatre &bull; 3D Theatre</span>
              <button
                type="button"
                onClick={() => navigateTo('admin')}
                className="text-[#888888] hover:text-[#ba8a40] transition-colors inline-flex items-center gap-1"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          FLOATING WHATSAPP QUICK ACTION BUTTON
      ===================================================================== */}
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#ba8a40] hover:bg-[#ba8a40] text-[#111314] shadow-2xl flex items-center justify-center transition-transform hover:scale-110"
      >
        <MessageCircle className="w-7 h-7 fill-[#111314]" />
      </a>

      {/* =====================================================================
          MODAL 1: PROJECT DETAIL EXPANDED VIEW / MODAL (FULL DESKTOP WIDTH, SINGLE SCROLLBAR, TOP VIDEO CTA)
      ===================================================================== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md overflow-y-auto p-2 sm:p-5 lg:p-8"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-[96vw] 2xl:max-w-[1480px] mx-auto rounded-[28px] bg-[#191C1D] border-2 border-[#ba8a40]/70 p-5 sm:p-8 lg:p-10 my-2 sm:my-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelectedProject(null)}
              aria-label="Close Project Detail"
              className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-[#111314]/90 border border-[#2A2E30] hover:border-[#ba8a40] text-white flex items-center justify-center transition-colors shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              {/* Main Selected Image (16:9 Widescreen Ratio Matching Reference2 + Left/Right Side Arrow Buttons) */}
              <div className="relative w-full aspect-[16/9] max-h-[76vh] rounded-2xl overflow-hidden bg-[#111314] border border-[#2A2E30]">
                <SafeImage
                  src={
                    selectedProject.images[projectModalImageIdx] ||
                    selectedProject.images[0]
                  }
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />

                {selectedProject.images.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setProjectModalImageIdx(
                          (projectModalImageIdx - 1 + selectedProject.images.length) %
                            selectedProject.images.length
                        )
                      }
                      aria-label="Previous Project Image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111314]/85 hover:bg-[#ba8a40] border border-[#ba8a40]/60 text-white hover:text-[#111314] flex items-center justify-center transition-all shadow-xl"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setProjectModalImageIdx(
                          (projectModalImageIdx + 1) % selectedProject.images.length
                        )
                      }
                      aria-label="Next Project Image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#111314]/85 hover:bg-[#ba8a40] border border-[#ba8a40]/60 text-white hover:text-[#111314] flex items-center justify-center transition-all shadow-xl"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </div>

              {/* Project Metadata, Title & Watch Project Video Button Row (Matching Reference2) */}
              <div className="space-y-4 pt-1">
                <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#ba8a40] font-semibold">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    <span>{selectedProject.location}</span>
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h2 className="font-obry-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white">
                    {selectedProject.title}
                  </h2>

                  {selectedProject.videoUrl && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedProject(null);
                        setActiveVideoUrl(
                          `https://www.youtube.com/embed/${siteContent.youtubeShowcaseId}?autoplay=1`
                        );
                        setVideoModalOpen(true);
                      }}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#151819] hover:bg-[#ba8a40] border border-[#ba8a40] text-white hover:text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider transition-all group shadow-lg shrink-0"
                    >
                      <Play className="w-4 h-4 text-[#ba8a40] group-hover:text-[#111314] fill-current transition-colors" />
                      <span>Watch Project Video</span>
                    </button>
                  )}
                </div>

                <div className="p-5 rounded-2xl bg-[#151819] border border-[#2A2E30]">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#ba8a40] mb-1">
                    Project Overview
                  </div>
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed">
                    {selectedProject.overview}
                  </p>
                </div>

                <p className="text-sm sm:text-base text-[#A1A1A1] leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Services Provided */}
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-white">
                    Services Provided:
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.servicesProvided.map((s) => (
                      <span
                        key={s}
                        className="px-3.5 py-1.5 rounded-full bg-[#151819] border border-[#2A2E30] text-xs text-[#ba8a40] font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-6 border-t border-[#2A2E30] flex flex-wrap items-center justify-between gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedProject(null);
                      navigateTo('contact', 'Smart Theatre');
                    }}
                    className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-[#ba8a40] text-[#111314] font-obry-display text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-opacity"
                  >
                    <span>Enquire About This Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 2: FULL-SCREEN GALLERY LIGHTBOX (NO CATEGORIES)
      ===================================================================== */}
      {lightboxIndex !== null && sortedGallery[lightboxIndex] && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex flex-col justify-between p-4 sm:p-8"
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            if (delta > 50) {
              setLightboxIndex(
                (lightboxIndex - 1 + sortedGallery.length) % sortedGallery.length
              );
            } else if (delta < -50) {
              setLightboxIndex((lightboxIndex + 1) % sortedGallery.length);
            }
            touchStartX.current = null;
          }}
        >
          {/* Top Lightbox Bar */}
          <div className="flex items-center justify-between">
            <span className="px-3.5 py-1 rounded-full bg-[#191C1D] border border-[#ba8a40]/50 text-[#ba8a40] text-xs font-mono">
              {lightboxIndex + 1} / {sortedGallery.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              aria-label="Close Lightbox"
              className="w-11 h-11 rounded-full bg-[#191C1D] border border-[#2A2E30] hover:border-[#ba8a40] text-white flex items-center justify-center"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image & Next/Prev Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4">
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(
                  (lightboxIndex - 1 + sortedGallery.length) % sortedGallery.length
                )
              }
              aria-label="Previous Image"
              className="absolute left-2 sm:left-6 z-10 w-12 h-12 rounded-full bg-[#191C1D]/90 border border-[#ba8a40]/50 hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <SafeImage
              src={sortedGallery[lightboxIndex].imageUrl}
              alt={sortedGallery[lightboxIndex].title}
              className="max-h-[72vh] max-w-full w-auto h-auto rounded-2xl object-contain border border-[#2A2E30] shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setLightboxIndex((lightboxIndex + 1) % sortedGallery.length)
              }
              aria-label="Next Image"
              className="absolute right-2 sm:right-6 z-10 w-12 h-12 rounded-full bg-[#191C1D]/90 border border-[#ba8a40]/50 hover:bg-[#ba8a40] text-white hover:text-[#111314] flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <h3 className="font-obry-display text-lg font-bold text-white">
              {sortedGallery[lightboxIndex].title}
            </h3>
            <p className="text-xs sm:text-sm text-[#A1A1A1]">
              {sortedGallery[lightboxIndex].caption}
            </p>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 3: YOUTUBE VIDEO SHOWCASE LIGHTBOX
      ===================================================================== */}
      {videoModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-3xl bg-[#191C1D] border-2 border-[#ba8a40] overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2E30]">
              <span className="font-obry-display text-xs font-extrabold uppercase tracking-wider text-[#ba8a40]">
                BSQUARE GLOBAL • OFFICIAL VIDEO SHOWCASE
              </span>
              <button
                type="button"
                onClick={() => setVideoModalOpen(false)}
                aria-label="Close Video Modal"
                className="w-8 h-8 rounded-full bg-[#151819] text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-video bg-black">
              <iframe
                src={activeVideoUrl}
                title="BSquare Global Smart & Home Theatre Showcase"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 4: SEARCH OVERLAY MODAL
      ===================================================================== */}
      {searchModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-start justify-center pt-20 p-4"
          onClick={() => setSearchModalOpen(false)}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-[#191C1D] border-2 border-[#ba8a40] p-6 space-y-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-[#2A2E30] pb-4">
              <Search className="w-5 h-5 text-[#ba8a40]" />
              <input
                type="text"
                autoFocus
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search BSquare Global projects, services, locations (e.g. Smart Theatre, Home Theatre, 3D Theatre)..."
                className="flex-1 bg-transparent text-white text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchModalOpen(false)}
                className="text-xs text-[#A1A1A1] hover:text-white"
              >
                ESC
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="space-y-4 max-h-80 overflow-y-auto">
                {searchResults.matchingServices.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#ba8a40]">
                      Matching Services (Home Page)
                    </div>
                    {searchResults.matchingServices.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          setSearchModalOpen(false);
                          setExpandedServiceId(s.id);
                          navigateTo('home');
                        }}
                        className="w-full p-3 rounded-xl bg-[#151819] hover:border-[#ba8a40] border border-[#2A2E30] text-left flex items-center justify-between"
                      >
                        <div>
                          <div className="font-obry-display text-xs font-bold text-white">
                            {s.name}
                          </div>
                          <div className="text-xs text-[#A1A1A1] line-clamp-1">
                            {s.shortDesc}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ba8a40] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.matchingProjects.length > 0 && (
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#ba8a40]">
                      Matching Projects (/projects)
                    </div>
                    {searchResults.matchingProjects.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => {
                          setSearchModalOpen(false);
                          setSelectedProject(p);
                          navigateTo('projects');
                        }}
                        className="w-full p-3 rounded-xl bg-[#151819] hover:border-[#ba8a40] border border-[#2A2E30] text-left flex items-center justify-between"
                      >
                        <div>
                          <div className="font-obry-display text-xs font-bold text-white">
                            {p.title}
                          </div>
                          <div className="text-xs text-[#A1A1A1]">
                            {p.location}
                          </div>
                        </div>
                        <ArrowUpRight className="w-4 h-4 text-[#ba8a40] shrink-0" />
                      </button>
                    ))}
                  </div>
                )}

                {searchResults.matchingProjects.length === 0 &&
                  searchResults.matchingServices.length === 0 && (
                    <div className="text-xs text-[#A1A1A1] py-4 text-center">
                      No matching services or projects found for &ldquo;{searchQuery}&rdquo;.
                    </div>
                  )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =====================================================================
          MODAL 5: IN-PAGE DELETE CONFIRMATION MODAL (SANDBOX-SAFE)
      ===================================================================== */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full rounded-2xl bg-[#191C1D] border border-red-500/50 p-6 space-y-4">
            <h3 className="font-obry-display text-base font-bold text-white">
              Confirm Deletion
            </h3>
            <p className="text-xs text-[#A1A1A1]">
              Are you sure you want to delete &ldquo;{deleteConfirmTarget.title}&rdquo;?
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="px-4 py-2 rounded-xl bg-[#151819] text-xs font-bold text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (deleteConfirmTarget.type === 'project') {
                    setProjects((prev) =>
                      prev.filter((p) => p.id !== deleteConfirmTarget.id)
                    );
                    showToast('Project deleted.');
                  } else {
                    setGallery((prev) =>
                      prev.filter((g) => g.id !== deleteConfirmTarget.id)
                    );
                    showToast('Photograph deleted from Gallery.');
                  }
                  setDeleteConfirmTarget(null);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 text-xs font-bold text-white"
              >
                Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
