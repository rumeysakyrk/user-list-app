export interface NavbarItem {
  title: string;
  icon: string;
  route: string;
  isHome?: boolean;
}

export const navbarItems: NavbarItem[] = [
  {
    title: "Kullanıcı Listesi",
    icon: "mdi-account-group",
    route: "home",
    isHome: true,
  },
  { title: "Gönderiler", icon: "mdi-post-outline", route: "posts" },
  { title: "Yorumlar", icon: "mdi-comment-outline", route: "comments" },
  { title: "Albüm", icon: "mdi-album", route: "albums" },
  { title: "Fotoğraflar", icon: "mdi-image", route: "photos" },
  { title: "Yapılacaklar", icon: "mdi-checkbox-marked", route: "todos" },
];
