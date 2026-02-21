import { FlatList, StyleSheet, View } from "react-native";
import Header from "../components/UI/Header";
import ContestPhotoCard from "../components/UI/cards/ContestPhotoCard";
import { useTheme } from "../context/theme/ThemeContext";
const mockPhotos = [
  {
    id: "1",
    author: "Alice",
    takenOn: new Date("2026-02-08T14:30:00Z").getTime(),
    title: "Sunset Beach",
    likes: 128,
    description:
      "A peaceful beach glowing under a vibrant sunset sky. Waves gently roll onto the shore as the horizon fades into warm orange and pink tones.",
    imageUrl:
      "https://images.unsplash.com/photo-1501973801540-537f08ccae7b?w=400",
  },
  {
    id: "2",
    author: "Bob",
    takenOn: new Date("2026-02-10T09:00:00Z").getTime(),
    title: "Mountain Lake",
    likes: 98,
    description:
      "A crystal-clear lake surrounded by towering mountain peaks. The calm water perfectly reflects the sky and rugged landscape. A crystal-clear lake surrounded by towering mountain peaks. The calm water perfectly reflects the sky and rugged landscape",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "3",
    author: "Charlie",
    takenOn: new Date("2026-02-12T18:15:00Z").getTime(),
    title: "Forest Trail",
    likes: 76,
    description:
      "A quiet trail winding through a dense green forest. Sunlight filters softly through the trees, creating a serene atmosphere.",
    imageUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400",
  },
  {
    id: "4",
    author: "Diana",
    takenOn: new Date("2026-02-13T08:00:00Z").getTime(),
    title: "City Skyline",
    likes: 214,
    description:
      "A stunning city skyline illuminated against the evening sky. Skyscrapers glow with lights as the city comes alive after sunset.",
    imageUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400",
  },
  {
    id: "5",
    author: "Ethan",
    takenOn: new Date("2026-02-14T20:45:00Z").getTime(),
    title: "Desert Dunes",
    likes: 64,
    description:
      "Golden sand dunes stretch endlessly under the bright sun. Wind-sculpted patterns create a dramatic and timeless desert scene.",
    imageUrl:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400",
  },
  {
    id: "6",
    author: "Fiona",
    takenOn: new Date("2026-02-15T11:10:00Z").getTime(),
    title: "Autumn Leaves",
    likes: 143,
    description:
      "Colorful autumn leaves blanket the ground in shades of red and gold. A crisp breeze carries the feeling of a changing season.",
    imageUrl:
      "https://images.unsplash.com/photo-1476041800959-2f6bb412c8ce?w=400",
  },
  {
    id: "7",
    author: "George",
    takenOn: new Date("2026-02-15T19:30:00Z").getTime(),
    title: "Starry Night",
    likes: 189,
    description:
      "A breathtaking view of a sky filled with countless stars. The quiet night is illuminated by the soft glow of the Milky Way.",
    imageUrl:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400",
  },
  {
    id: "8",
    author: "Hannah",
    takenOn: new Date("2026-02-16T14:50:00Z").getTime(),
    title: "Tropical Paradise",
    likes: 201,
    description:
      "Turquoise waters meet soft white sands beneath swaying palm trees. A perfect escape into a warm and relaxing island setting.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
  {
    id: "9",
    author: "Ian",
    takenOn: new Date("2026-02-16T22:05:00Z").getTime(),
    title: "Snowy Peaks",
    likes: 167,
    description:
      "Snow-covered mountain peaks rise sharply into the clear sky. The crisp air and untouched snow create a pure winter landscape.",
    imageUrl:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400",
  },
  {
    id: "10",
    author: "Jane",
    takenOn: new Date("2026-02-17T08:40:00Z").getTime(),
    title: "River Bend",
    likes: 112,
    description:
      "A serene river bends through a lush green valley. Gentle currents ripple over rocks as sunlight dances on the water.",
    imageUrl:
      "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=400",
  },
  {
    id: "11",
    author: "Kevin",
    takenOn: new Date("2026-02-17T12:20:00Z").getTime(),
    title: "Golden Fields",
    likes: 85,
    description:
      "Rolling fields of golden wheat under a bright blue sky. The landscape stretches far with gentle hills and soft light.",
    imageUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=400",
  },
  {
    id: "12",
    author: "Laura",
    takenOn: new Date("2026-02-17T18:55:00Z").getTime(),
    title: "Cliffside View",
    likes: 95,
    description:
      "A dramatic cliff overlooking the ocean at sunset. Waves crash against the rocks below as the sky glows in warm colors.",
    imageUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400",
  },
];

export default function HomeScreen({ navigation }) {
  const { theme } = useTheme();
  const pressHandler = () => {
    navigation.navigate("PhotoDetailScreen", { item });
  };
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Header purpose="HOME" />

      <FlatList
        data={mockPhotos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ContestPhotoCard
            photo={item}
            onPress={() => navigation.navigate("Details", { item })}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  listContent: {
    padding: 16,
  },
});

