import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.Scanner;

public class RandevuSistemi {
    private static Map<Integer, String> saatler = new HashMap<>();
    private static Map<Integer, String> randevular = new HashMap<>();

    public static void main(String[] args) {
        // Saatlerin şablonunu oluştur
        for (int i = 0; i < 24; i++) {
            saatler.put(i, "Pasif");
        }

        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.print("Randevu tarihini ve saatini girin (yyyy-MM-dd HH:mm): ");
            String dateTimeString = scanner.nextLine();

            LocalDateTime randevuTarihi = LocalDateTime.parse(dateTimeString, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm"));

            if (randevuMevcutMu(randevuTarihi)) {
                System.out.println("Seçilen saatte randevu mevcut. Lütfen başka bir saat deneyin.");
            } else {
                System.out.print("Randevu adınızı girin: ");
                String ad = scanner.nextLine();
                int saat = randevuTarihi.getHour();
                randevuEkle(saat, ad);
                System.out.println("Randevu başarıyla alındı!");
                break;
            }
        }

        // Randevu saatlerini göster
        System.out.println("Randevu Saatleri:");
        for (int saat : saatler.keySet()) {
            String durum = saatler.get(saat);
            System.out.println(saat + ":00 - Durum: " + durum);
        }

        // İptal veya değiştirme seçenekleri
        System.out.print("İptal etmek veya değiştirmek istediğiniz randevunuz var mı? (E/H): ");
        String secim = scanner.nextLine();

        if (secim.equalsIgnoreCase("E")) {
            System.out.print("Randevunuzun saatini girin: ");
            int iptalSaat = scanner.nextInt();
            iptalEt(iptalSaat);
            System.out.println("Randevunuz iptal edildi!");
        } else if (secim.equalsIgnoreCase("H")) {
            System.out.println("Randevu değiştirme işlemi seçilmedi.");
        }

        scanner.close();
    }

    private static boolean randevuMevcutMu(LocalDateTime randevuTarihi) {
        int saat = randevuTarihi.getHour();
        return randevular.containsKey(saat);
    }

    private static void randevuEkle(int saat, String ad) {
        randevular.put(saat, ad);
        saatler.put(saat, "Aktif");
    }

    private static void iptalEt(int saat) {
        randevular.remove(saat);
        saatler.put(saat, "Pasif");
    }
}
