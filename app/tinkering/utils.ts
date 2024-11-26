interface Project {
  title: string;
  link: string;
}

export function getTinkeringProjects(): Project[] {
  return [
    {
      title: 'Folks',
      link: 'https://getfolks.app',
    },
    {
      title: 'Somehow I Manage - Product Teams Podcast',
      link: 'https://podcasts.apple.com/us/podcast/somehow-i-manage-product-teams/id1665329128',
    },
    {
      title: 'Replay App for tvOS',
      link: 'https://github.com/omnissa-archive/replay-app-for-tvos',
    },
    // Add more projects as needed
  ]
}
